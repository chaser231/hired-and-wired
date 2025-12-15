'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui';

export default function CampaignSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const teamId = searchParams.get('teamId') || '1';

  const handleViewCampaigns = () => {
    router.push(`/teams/${teamId}`);
  };

  const handleCreateAnother = () => {
    router.push(`/campaigns/new?teamId=${teamId}`);
  };

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      {/* Full Screen Background Image */}
      <Image
        src="/assets/Rectangle 229 (1).png"
        alt="Success background"
        fill
        className="object-cover"
        priority
      />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center gap-[var(--space-xxl)]">
          {/* Icon Check */}
          <div
            className="flex items-center justify-center w-[120px] h-[120px] rounded-full"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
          >
            <svg
              width="60"
              height="60"
              viewBox="0 0 60 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 32L25 42L45 18"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Text */}
          <div className="flex flex-col items-center gap-[var(--space-xl)]">
            <h1 className="text-h1" style={{ color: 'var(--color-white)' }}>
              Campaign Published!
            </h1>
            <p
              className="text-description"
              style={{ color: 'rgba(255, 255, 255, 0.8)' }}
            >
              Your hiring campaign is now live
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col items-center gap-[var(--space-m)]">
            <Button
              variant="on-color"
              onClick={handleViewCampaigns}
              className="min-w-[200px]"
            >
              view campaigns
            </Button>
            <div className="flex gap-[var(--space-xs)]">
              <Button
                variant="on-color"
                onClick={handleCreateAnother}
              >
                create another
              </Button>
              <Button
                variant="on-color"
                onClick={handleGoHome}
              >
                go home
              </Button>
            </div>
          </div>
        </div>
    </main>
  );
}

