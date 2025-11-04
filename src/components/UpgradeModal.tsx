import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Zap } from 'lucide-react';
import { UserPlan, BillingCycle } from '@/types/enums';
import { formatPrice } from '@/types/formatters';

interface PricingPlan {
  plan: UserPlan;
  price?: number;
  monthlyPrice?: number;
  yearlyPrice?: number;
  features: string[];
}

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPlan: UserPlan;
  plans: PricingPlan[];
  onUpgrade: (plan: UserPlan, billingCycle: BillingCycle) => void;
}

export function UpgradeModal({ isOpen, onClose, currentPlan, plans, onUpgrade }: UpgradeModalProps) {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>(BillingCycle.MONTHLY);

  const handleUpgrade = (plan: UserPlan) => {
    onUpgrade(plan, billingCycle);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="heading-lg flex items-center gap-2">
            <Crown className="w-6 h-6 text-accent-amber" />
            Upgrade to Premium
          </DialogTitle>
          <DialogDescription>
            Unlock unlimited transformations and advanced features
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-center gap-2 my-4">
          <Button
            variant={billingCycle === BillingCycle.MONTHLY ? 'default' : 'outline'}
            onClick={() => setBillingCycle(BillingCycle.MONTHLY)}
            className={billingCycle === BillingCycle.MONTHLY ? 'bg-primary-cyan' : ''}
          >
            Monthly
          </Button>
          <Button
            variant={billingCycle === BillingCycle.YEARLY ? 'default' : 'outline'}
            onClick={() => setBillingCycle(BillingCycle.YEARLY)}
            className={billingCycle === BillingCycle.YEARLY ? 'bg-primary-cyan' : ''}
          >
            Yearly
            <Badge variant="secondary" className="ml-2 bg-success-green text-white">
              Save 20%
            </Badge>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plans.map((plan) => {
            const isCurrent = plan.plan === currentPlan;
            const isPremium = plan.plan === UserPlan.PREMIUM;
            const price = isPremium
              ? billingCycle === BillingCycle.MONTHLY
                ? plan.monthlyPrice
                : plan.yearlyPrice
              : plan.price;

            return (
              <Card
                key={plan.plan}
                className={`p-6 relative ${
                  isPremium ? 'border-primary-cyan border-2' : ''
                }`}
              >
                {isPremium && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary-cyan to-primary-teal">
                    <Zap className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                )}

                <div className="text-center mb-6">
                  <h3 className="heading-md mb-2">
                    {plan.plan === UserPlan.FREE ? 'Free Plan' : 'Premium Plan'}
                  </h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="heading-xl">{formatPrice(price || 0)}</span>
                    {isPremium && (
                      <span className="body-sm text-muted-foreground">
                        /{billingCycle === BillingCycle.MONTHLY ? 'month' : 'year'}
                      </span>
                    )}
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-success-green flex-shrink-0 mt-0.5" />
                      <span className="body-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    isPremium ? 'bg-primary-cyan hover:bg-primary-cyan/90' : ''
                  }`}
                  variant={isCurrent ? 'outline' : 'default'}
                  disabled={isCurrent}
                  onClick={() => handleUpgrade(plan.plan)}
                >
                  {isCurrent ? 'Current Plan' : isPremium ? 'Upgrade Now' : 'Downgrade'}
                </Button>
              </Card>
            );
          })}
        </div>

        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <p className="body-sm text-center text-muted-foreground">
            All plans include secure data processing and 24/7 customer support
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}