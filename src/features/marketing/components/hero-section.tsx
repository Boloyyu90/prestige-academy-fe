'use client';

import { Button } from '@/shared/components/ui/button';
import { Heading, Text } from '@/shared/core/typography';
import Link from 'next/link';
import Image from 'next/image';
import { Animate, HeroAnimate } from '@/shared/core/animate';
export function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden pt-16">
      <div className="absolute inset-0 z-0">
        <Animate
          animation="fadeInLeft"
          speed="slow"
          className="absolute bottom-0 left-0 w-[48vw] h-full hidden lg:block"
        >
          <Image
            src="/images/backgrounds/hero-asset-left.svg"
            alt=""
            fill
            className="object-contain object-bottom"
            sizes="42vw"
            priority={false}
          />
        </Animate>

        <Animate
          animation="fadeInRight"
          speed="slow"
          className="absolute bottom-0 right-0 w-[75vw] sm:w-[65vw] md:w-[55vw] lg:w-[48vw] h-full"
        >
          <Image
            src="/images/backgrounds/hero-asset-right.svg"
            alt="CPNS Professional"
            fill
            className="object-contain object-bottom"
            priority
            sizes="(min-width: 1024px) 45vw, (min-width: 768px) 55vw, (min-width: 640px) 65vw, 75vw"
          />
        </Animate>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-start min-h-[calc(100vh-4rem)] pt-20 pb-8 lg:pl-32">
          <div className="w-full lg:w-[55%] xl:w-[50%]">

            <HeroAnimate className="mb-8">
              <Heading
                as="h1"
                size="display-lg"
                variant="default"
                className="tracking-normal text-center sm:text-center md:text-center lg:text-left space-y-2"
              >
                <span className="block text-foreground font-bold text-3xl sm:text-4xl md:text-5xl">Langkah Awal</span>
                <span className="block text-foreground font-bold text-3xl sm:text-4xl md:text-5xl">Menuju Karir</span>
                <span className="block font-bold text-3xl sm:text-4xl md:text-5xl">
                  Impian{' '}
                  <span className="relative text-primary font-bold text-3xl sm:text-4xl md:text-5xl">
                    CPNS!
                    <div className="absolute bottom-0 left-0 w-full h-1 sm:h-1.5 lg:h-1.5 bg-secondary rounded-full origin-left animate-wipe-in-right animation-delay-slow"></div>
                  </span>
                </span>
              </Heading>
            </HeroAnimate>

            <HeroAnimate delay={100} className="mb-6">
              <Text
                size="md"
                variant="muted"
                className="max-w-lg mx-auto sm:mx-auto md:mx-auto lg:mx-0 text-center sm:text-center md:text-center lg:text-left"
              >
                Prestige Academy membuka sayap menuju era cemerlangmu! Seperti Jalak Bali yang istimewa, kami mengubah pengetahuan menjadi pencerahan. Terbang tinggi bersama kami, melestarikan nilai berharga sambil menembus batas potensimu!
              </Text>
            </HeroAnimate>

            <HeroAnimate delay={200}>
              <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center sm:justify-center md:justify-center lg:justify-start">
                <Button
                  size="lg"
                  variant="secondary"
                  animation="scale"
                  className="font-semibold shadow-colored-secondary min-w-[200px] w-full sm:w-auto"
                  asChild
                >
                  <Link href="/register">
                    Belajar Sekarang!
                  </Link>
                </Button>

                <Button
                  variant="default"
                  size="lg"
                  animation="scale"
                  className="font-semibold text-white hover:bg-primary min-w-[140px] w-full sm:w-auto"
                  asChild
                >
                  <Link href="/login">
                    Masuk
                  </Link>
                </Button>
              </div>
            </HeroAnimate>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;