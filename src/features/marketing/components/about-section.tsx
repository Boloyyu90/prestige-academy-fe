'use client';

import Image from 'next/image';
import { Badge } from '@/shared/components/ui/badge';
import { Heading, Text } from '@/shared/core/typography';
import { Section } from '@/shared/core/section';
import { Animate } from '@/shared/core/animate';

const AboutSection = () => {
  const features = [
    '#Platform Terintegrasi',
    '#Soal Berbasis Field Report',
    '#Evaluasi Diagnostik Presisi Tinggi',
    '#Komunitas Profesional'
  ];

  return (
    <Section id="about" variant="transparent" padding="lg">
      {/* Top Badge */}
      <Animate animation="fadeInUp">
        <div className="mb-12 sm:mb-14 md:mb-16 lg:flex justify-center hidden">
          <div className="inline-flex items-center rounded-full bg-card border border-border px-4 sm:px-6 py-2 sm:py-3 shadow-soft hover:shadow-medium transition-all duration-fast">
            <Text size="sm" weight="medium" className="text-card-foreground text-xs sm:text-sm">
              Tingkatkan nilai dengan simulasi berbasis riset!
            </Text>
            <Text size="sm" weight="semibold" className="ml-2 text-primary whitespace-nowrap text-xs sm:text-sm">
              Jadilah peserta berikutnya →
            </Text>
          </div>
        </div>
      </Animate>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-14 lg:gap-16 items-center">

        {/* Image */}
        <Animate animation="fadeInLeft" className="lg:order-1 order-2">
          <div className="relative max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto lg:mx-0">
            <Image
              src="/images/illustrations/marketing/about-asset.svg"
              alt="About Prestige Academy"
              width={550}
              height={450}
              className="w-full h-auto"
              priority
              sizes="(min-width: 1024px) 550px, (min-width: 768px) 448px, (min-width: 640px) 384px, 320px"
            />

            {/* Feature Badges - Mobile */}
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mt-6 lg:hidden">
              {features.map((feature, index) => (
                <div
                  key={`mobile-${index}`}
                  className="animate-scaleIn"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <Badge
                    variant="primary-subtle"
                    size="sm"
                    animation="scale"
                    className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium"
                  >
                    {feature}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </Animate>

        {/* Content */}
        <Animate animation="fadeInRight" className="lg:order-2 order-1 space-y-6 sm:space-y-7 md:space-y-8 text-center sm:text-center md:text-center lg:text-left">
          {/* Heading */}
          <Heading
            as="h2"
            size="display-md"
            variant="default"
            className="tracking-normal space-y-2"
          >
            <span className="text-3xl sm:text-4xl md:text-4xl">
              Tentang,
            </span>
            <span className="block text-3xl sm:text-4xl md:text-4xl">
              <span className="text-primary">Prestige</span>{' '}
              <span className="text-secondary">Academy</span>
            </span>
          </Heading>

          {/* Description */}
          <div className="space-y-4 sm:space-y-5 md:space-y-6 max-w-lg mx-auto lg:mx-0">
            <Text size="md" variant="muted" className="text-sm sm:text-base leading-relaxed">
              Selamat datang di Prestige Academy, tempat di mana semangat
              belajar dan potensi berharga bertemu. Seperti Jalak Bali yang
              langka dan istimewa, kami percaya bahwa setiap individu
              memiliki keunikan, transformasi pengetahuan, dan kebebasan
              untuk terbang menuju puncak prestasi.
            </Text>
            <Text size="md" variant="muted" className="text-sm sm:text-base leading-relaxed hidden lg:block">
              Bersama kami, kamu akan dipersiapkan dengan materi dan tryout
              berkualitas untuk menghadapi seleksi-seleksi penting, dengan
              keseimbangan sempurna antara tradisi dan inovasi.
              Bergabunglah dan terbang lebih tinggi bersama kami!
            </Text>
          </div>

          {/* Feature Badges - Desktop */}
          <div className="flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start hidden lg:flex">
            {features.map((feature, index) => (
              <div
                key={index}
                className="animate-scaleIn"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <Badge
                  variant="primary-subtle"
                  size="sm"
                  animation="scale"
                  className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium"
                >
                  {feature}
                </Badge>
              </div>
            ))}
          </div>
        </Animate>
      </div>
    </Section>
  );
};

export default AboutSection;