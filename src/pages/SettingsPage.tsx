import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { User, Mail, Crown, HardDrive, Activity } from 'lucide-react';
import { mockUser, mockPricingPlans } from '@/data/transformerMockData';
import { formatFileSize, formatUserPlan } from '@/types/formatters';
import { UpgradeModal } from '@/components/UpgradeModal';
import { UserPlan, BillingCycle } from '@/types/enums';

export function SettingsPage() {
  const [user] = useState(mockUser);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  const storagePercentage = (user.storageUsed / user.storageLimit) * 100;
  const transformationsPercentage = (user.transformationsThisMonth / user.transformationLimit) * 100;

  const handleUpgrade = (plan: UserPlan, billingCycle: BillingCycle) => {
    console.log('Upgrading to:', plan, billingCycle);
    // Handle upgrade logic here
  };

  return (
    <div className="container px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="heading-lg mb-2">Settings</h1>
          <p className="body-md text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="space-y-6">
          {/* Profile Section */}
          <Card className="p-6">
            <h2 className="heading-sm mb-6">Profile Information</h2>
            
            <div className="flex items-center gap-6 mb-6">
              <Avatar className="w-20 h-20">
                <AvatarFallback className="bg-primary-cyan text-white text-2xl">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="heading-sm">{user.name}</h3>
                <p className="body-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue={user.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={user.email} />
                </div>
              </div>
              
              <Button className="bg-primary-cyan hover:bg-primary-cyan/90">
                Save Changes
              </Button>
            </div>
          </Card>

          {/* Plan & Usage Section */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="heading-sm">Plan & Usage</h2>
              <Badge 
                variant={user.plan === UserPlan.PREMIUM ? 'default' : 'secondary'}
                className={user.plan === UserPlan.PREMIUM ? 'bg-gradient-to-r from-primary-cyan to-primary-teal' : ''}
              >
                {user.plan === UserPlan.PREMIUM && <Crown className="w-3 h-3 mr-1" />}
                {formatUserPlan(user.plan)}
              </Badge>
            </div>

            <div className="space-y-6">
              {/* Storage Usage */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <HardDrive className="w-4 h-4 text-muted-foreground" />
                    <span className="body-sm font-medium">Storage Usage</span>
                  </div>
                  <span className="body-sm text-muted-foreground">
                    {formatFileSize(user.storageUsed)} / {formatFileSize(user.storageLimit)}
                  </span>
                </div>
                <Progress value={storagePercentage} className="h-2" />
              </div>

              {/* Transformations This Month */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-muted-foreground" />
                    <span className="body-sm font-medium">Transformations This Month</span>
                  </div>
                  <span className="body-sm text-muted-foreground">
                    {user.transformationsThisMonth} / {user.transformationLimit}
                  </span>
                </div>
                <Progress value={transformationsPercentage} className="h-2" />
              </div>

              {user.plan === UserPlan.FREE && (
                <div className="p-4 bg-gradient-to-r from-primary-cyan/10 to-primary-teal/10 rounded-lg border border-primary-cyan/20">
                  <div className="flex items-start gap-3">
                    <Crown className="w-5 h-5 text-primary-cyan flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="body-md font-semibold mb-1">Upgrade to Premium</h4>
                      <p className="body-sm text-muted-foreground mb-3">
                        Get unlimited transformations, larger file sizes, and advanced features
                      </p>
                      <Button 
                        onClick={() => setIsUpgradeModalOpen(true)}
                        className="bg-primary-cyan hover:bg-primary-cyan/90"
                      >
                        View Plans
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Account Actions */}
          <Card className="p-6">
            <h2 className="heading-sm mb-6">Account Actions</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="body-md font-medium mb-2">Change Password</h3>
                <p className="body-sm text-muted-foreground mb-3">
                  Update your password to keep your account secure
                </p>
                <Button variant="outline">Change Password</Button>
              </div>

              <Separator />

              <div>
                <h3 className="body-md font-medium mb-2 text-destructive">Delete Account</h3>
                <p className="body-sm text-muted-foreground mb-3">
                  Permanently delete your account and all associated data
                </p>
                <Button variant="destructive">Delete Account</Button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <UpgradeModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
        currentPlan={user.plan}
        plans={mockPricingPlans}
        onUpgrade={handleUpgrade}
      />
    </div>
  );
}