'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/shared/components/ui/button';
import { Card } from '@/shared/components/ui/card';
import { Section } from '@/shared/core/section';
import { Animate } from '@/shared/core/animate';
import { Heading, Text } from '@/shared/core/typography';
import { cn } from '@/shared/lib/utils/cn';
import { Check, ChevronRight, Zap, BarChart3, Trophy, Library } from 'lucide-react'

interface Feature {
    id: string;
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    description: string;
    benefits: string[];
    mockup: string;
    color: 'default' | 'secondary' | 'success';
}

const FeaturesSection = () => {
    const [activeFeature, setActiveFeature] = useState('simulasi');

    const features: Feature[] = [
        {
            id: 'simulasi',
            title: 'Simulasi Ujian',
            subtitle: 'Mirip Asli',
            icon: Zap,
            description: 'Rasakan pengalaman ujian yang sesungguhnya dengan sistem tryout yang dirancang sama persis dengan tes CAT sesungguhnya.',
            benefits: [
                'Materi & soal terbaru', 'Analisis hasil otomatis', 'Simulasi ujian mirip asli'
            ],
            mockup: '/images/illustrations/marketing/features-asset-1.svg',
            color: 'default'
        },
        {
            id: 'bank-soal',
            title: 'Bank Soal Lengkap',
            subtitle: 'Teruji & Akurat',
            icon: Library,
            description: 'Dapatkan akses ke 50+ paket soal premium yang dirancang oleh tim ahli berdasarkan riset mendalam dari blueprint dan tren ujian tahun-tahun sebelumnya.',
            benefits: [
                '50+ paket soal siap pakai',
                'Sesuai blueprint ujian terbaru',
                'Tingkat kesulitan bervariasi (mudah, sedang, sulit)',
                'Termasuk pembahasan detail & kunci jawaban'
            ],
            mockup: '/images/illustrations/marketing/features-asset-2.svg',
            color: 'secondary'
        },
        {
            id: 'peringkat',
            title: 'Sistem Peringkat',
            subtitle: 'Kompetitif',
            icon: Trophy,
            description: 'Bersaing dengan ribuan peserta lain dan lihat posisi peringkat Anda untuk terus memotivasi diri menjadi yang terbaik.',
            benefits: ['Leaderboard nasional', 'Ranking berdasarkan kategori', 'Kompetisi mingguan & bulanan'],
            mockup: '/images/illustrations/marketing/features-asset-3.svg',
            color: 'success'
        }
    ];

    const activeFeatureData = features.find(f => f.id === activeFeature) || features[0];
    const activeColorName = activeFeatureData.color === 'default' ? 'primary' : activeFeatureData.color;

    const tabColorClasses = {
        default: 'bg-primary text-white',
        secondary: 'bg-secondary text-white',
        success: 'bg-success text-white'
    };

    return (
      <Section id="features" variant="transparent" padding="lg" className="relative overflow-hidden scroll-mt-16">
          <div className="relative z-10 space-y-8">
              <Animate animation="fadeInUp" className="text-center space-y-4">
                  <Heading
                    as="h2"
                    size="display-md"
                    variant="default"
                    className="tracking-normal"
                    align="center">
                      <span className="text-3xl sm:text-4xl md:text-4xl">
                          Fitur Unggulan Prestige Academy
                      </span>
                  </Heading>
                  <Text size="md" variant="muted" align="center" className="max-w-3xl mx-auto">
                      Persiapkan diri dengan pengalaman terbaik berbasis riset untuk menghadapi ujian di depan Anda.
                  </Text>
              </Animate>

              <div className="max-w-7xl mx-auto">
                  <div className="animate-fadeInUp animation-delay-fast mb-10">
                      <div className="flex justify-center">
                          <Card variant="default" className={cn(
                            "flex flex-col items-stretch p-2 space-y-2 w-full max-w-sm",
                            "lg:inline-flex lg:flex-row lg:items-center lg:space-y-0 lg:space-x-6 lg:w-auto lg:max-w-none"
                          )}>
                              {features.map((feature) => {
                                  const isActive = activeFeature === feature.id;
                                  const IconComponent = feature.icon;
                                  const iconColorName = feature.color === 'default' ? 'primary' : feature.color;
                                  return (
                                    <button
                                      key={feature.id}
                                      onClick={() => setActiveFeature(feature.id)}
                                      className={cn(
                                        'relative flex items-center gap-3 px-5 py-3 rounded-full transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                                        'justify-center w-full lg:w-auto lg:justify-start',
                                        isActive ? tabColorClasses[feature.color] : 'hover:bg-muted'
                                      )}
                                      aria-pressed={isActive}
                                    >
                                        <IconComponent className={cn('w-5 h-5 transition-colors', isActive ? 'text-white' : `text-${iconColorName}`)} />
                                        <span className="font-semibold text-sm md:text-base whitespace-nowrap">
                                            {feature.title}
                                        </span>
                                    </button>
                                  );
                              })}
                          </Card>
                      </div>
                  </div>

                  <div className={cn(
                    "flex flex-col gap-8",
                    "lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center"
                  )}>
                      <Animate
                        animation="fadeInLeft"
                        className="order-1 lg:order-1 flex items-center justify-center">
                          <Image
                            src={activeFeatureData.mockup}
                            alt={`${activeFeatureData.title} mockup`}
                            width={600}
                            height={450}
                            className="w-full h-auto max-w-md"
                            priority={activeFeature === 'simulasi'}
                          />
                      </Animate>

                      <Animate animation="fadeInRight" className="order-2 lg:order-2 space-y-8">
                          <div className="space-y-4">
                              <Heading as="h3" size="display-sm" className="leading-tight">
                                  {activeFeatureData.title}{' '}
                                  <span className={cn('block', `text-${activeColorName}`)}>
                                    {activeFeatureData.subtitle}
                                  </span>
                              </Heading>
                              <Text size="md" variant="muted">{activeFeatureData.description}</Text>
                          </div>

                          <div className="space-y-4">
                              {activeFeatureData.benefits.map((benefit, index) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-4 animate-fadeInUp"
                                  style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <div className={cn('w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0', `bg-${activeColorName}/10`)}>
                                        <Check className={cn('w-4 h-4', `text-${activeColorName}`)} strokeWidth={3} />
                                    </div>
                                    <Text weight="medium" size="md">{benefit}</Text>
                                </div>
                              ))}
                          </div>

                          <div className="pt-4 animate-fadeInUp animation-delay-normal">
                              <Button
                                size="lg"
                                variant="default"
                                animation="hover"
                                className="group rounded-full px-8"
                              >
                                  Pelajari Lebih Lanjut
                                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                              </Button>
                          </div>
                      </Animate>
                  </div>
              </div>
          </div>
      </Section>
    );
};

export default FeaturesSection;