'use client';

import { Badge } from '@/shared/components/ui/badge';
import { Card } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Section } from '@/shared/core/section';
import { Heading, Text } from '@/shared/core/typography';
import Image from 'next/image';
import { Check, X, ChevronRight } from 'lucide-react';
import { Animate } from '@/shared/core/animate';
import { cn } from '@/shared/lib/utils/cn';

const MASTER_FEATURES = [
  { id: 'tryout', text: 'Akses Tryout SKD Premium' },
  { id: 'video_discussion', text: 'Pembahasan Soal via Video' },
  { id: 'detailed_analysis', text: 'Analisis Hasil & Peringkat Nasional' },
  { id: 'discussion_group', text: 'Grup Diskusi Eksklusif' },
  { id: 'personal_consulting', text: 'Konsultasi Personal 1-on-1' },
  { id: 'interview_simulation', text: 'Simulasi Wawancara' },
  { id: 'guarantee', text: 'Garansi Lulus*' },
];

interface Package {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  popular?: boolean;
  badge?: string;
  includedFeatureIds: string[];
  featureDescriptions: { [key: string]: string };
}

const PriceDisplay = ({ price, originalPrice }: { price: number; originalPrice?: number }) => (
  <div className="space-y-1">
    <div className="flex items-baseline gap-2">
      <Text size="xs" variant="muted">RP</Text>
      <Heading as="h4" size="md" className="text-foreground">
        {price === 0 ? 'GRATIS' : price.toLocaleString('id-ID')}
      </Heading>
      {originalPrice && originalPrice > price && (
        <Text size="sm" variant="muted" className="line-through">
          {originalPrice.toLocaleString('id-ID')}
        </Text>
      )}
    </div>
    {originalPrice && originalPrice > price && (
      <Badge variant="error" className="text-xs">
        Hemat {Math.round(((originalPrice - price) / originalPrice) * 100)}%
      </Badge>
    )}
  </div>
);

const PackageCard = ({ pkg, index }: { pkg: Package; index: number }) => (
  <Card
    className={cn(
      'relative flex flex-col h-full overflow-hidden border-border hover:shadow-xl',
      'transition-all duration-fast group'
    )}
    animation="hover"
  >
    {/* Popular Badge */}
    {pkg.popular && (
      <div className="absolute -right-12 top-8 z-20">
        <div className="bg-secondary px-12 py-2 rotate-45 shadow-lg">
          <Text size="xs" weight="bold" className="text-center text-white">
            🔥 POPULER
          </Text>
        </div>
      </div>
    )}

    <div className="flex flex-col h-full">
      {/* Header Banner */}
      <div className="relative h-32 overflow-hidden mb-6 rounded-3xl border border-gray-200">
        <Image
          src="/images/illustrations/card-banner.svg"
          alt="Package Banner"
          fill
          className="object-cover"
        />
      </div>

      <div className="flex-1 space-y-6">
        {/* Package Info */}
        <div className="space-y-3">
          <div className="flex justify-between items-start">
            <Heading as="h3" size="md" className="text-foreground">
              {pkg.title}
            </Heading>
            <Badge
              variant={pkg.popular ? "secondary" : pkg.price === 0 ? "success" : "default"}
              className="font-medium"
            >
              {pkg.badge || (pkg.price === 0 ? "Gratis!" : "Premium!")}
            </Badge>
          </div>

          <Text size="sm" variant="muted" className="leading-relaxed">
            {pkg.description}
          </Text>
        </div>

        {/* Price Display */}
        <PriceDisplay price={pkg.price} originalPrice={pkg.originalPrice} />

        {/* Features List */}
        <div className="border-t border-border flex-1 pt-6 space-y-4">
          {MASTER_FEATURES.map((feature) => {
            const isIncluded = pkg.includedFeatureIds.includes(feature.id);
            const featureText = pkg.featureDescriptions[feature.id] || feature.text;

            return (
              <div key={feature.id} className="flex items-start gap-3">
                {isIncluded ? (
                  <Check className="w-5 h-5 text-success mt-1 flex-shrink-0" />
                ) : (
                  <X className="w-5 h-5 text-destructive/50 mt-1 flex-shrink-0" />
                )}
                <Text size="sm" className={cn(!isIncluded && "text-muted-foreground line-through")}>
                  {featureText}
                </Text>
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="pt-4">
          <Button
            className="w-full group"
            size="lg"
            variant="default"
            animation="hover"
          >
            {pkg.price === 0 ? 'Coba Gratis' : 'Pilih Paket'}
            <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  </Card>
);

const PackagesSection = () => {
  const packages: Package[] = [
    {
      id: "1",
      title: "Paket Gratis",
      description: "Coba platform kami dengan pengalaman yang menyegarkan.",
      price: 0,
      badge: "Gratis!",
      includedFeatureIds: ['tryout'],
      featureDescriptions: {
        'tryout': "Akses 1x Tryout SKD",
      }
    },
    {
      id: "2",
      title: "Paket Premium",
      description: "Persiapan lengkap untuk hasil maksimal.",
      price: 99000,
      originalPrice: 149000,
      popular: true,
      badge: "Terlaris!",
      includedFeatureIds: ['tryout', 'video_discussion', 'detailed_analysis', 'discussion_group'],
      featureDescriptions: {
        'tryout': "Akses 5x Tryout SKD",
        'video_discussion': "Pembahasan Soal via Video HD",
      }
    },
    {
      id: "3",
      title: "Paket Ultimate",
      description: "Paket terlengkap dengan bimbingan personal.",
      price: 199000,
      originalPrice: 299000,
      badge: "Best Value!",
      includedFeatureIds: ['tryout', 'video_discussion', 'detailed_analysis', 'discussion_group', 'personal_consulting', 'interview_simulation', 'guarantee'],
      featureDescriptions: {
        'tryout': "Akses 10x Tryout SKD",
      }
    }
  ];

  return (
    <Section id="packages" variant="default" padding="lg" container="default">
      <div className="space-y-16">
        {/* Header */}
        <Animate animation="fadeInUp" className="text-center space-y-4">
          <Heading
            as="h2"
            size="display-md"
            variant="default"
            className="tracking-normal"
            align="center"
          >
            <span className="text-3xl sm:text-4xl md:text-4xl">
              Pilih Paket Belajar Terbaik
            </span>
          </Heading>
          <Text size="md" variant="muted" align="center" className="max-w-3xl mx-auto">
            Mulai perjalanan sukses CASN Anda dengan paket yang dirancang sesuai kebutuhan dan budget.
          </Text>
        </Animate>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {packages.map((pkg, index) => (
            <div
              key={pkg.id}
              className="animate-fadeInUp"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <PackageCard pkg={pkg} index={index} />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <Animate animation="fadeInUp" delay="normal" className="text-center">
          <Text size="sm" variant="muted" className="mb-4">
            *Syarat dan ketentuan berlaku. Garansi berlaku dengan ketentuan tertentu.
          </Text>
        </Animate>
      </div>
    </Section>
  );
};

export default PackagesSection;