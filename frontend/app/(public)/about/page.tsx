'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function About() {
  const team = [
    {
      name: 'Dr. Amina Hassan',
      role: 'Founder & CEO',
      icon: (
        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
      ),
      bio: 'Healthcare innovator with 15 years in medical fundraising',
    },
    {
      name: 'Chukwu Okafor',
      role: 'CTO',
      icon: (
        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 3.285a7.48 7.48 0 0 1 5.982-2.975m11.963 3.285A8.466 8.466 0 0 1 12 21a8.466 8.466 0 0 1-5.982-3.285m0 3.285a8.466 8.466 0 0 1-5.982-3.285M4.984 3.983A8.466 8.466 0 0 1 12 5a8.466 8.466 0 0 1 5.982 3.285m0 3.285A8.467 8.467 0 0 1 12 13.5a8.467 8.467 0 0 1-5.982-3.285M12 13.5v4.5" />
        </svg>
      ),
      bio: 'Tech visionary building transparent healthcare platforms',
    },
    {
      name: 'Grace Adeyemi',
      role: 'Head of Compliance',
      icon: (
        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.016-.507-2.855l.054-.853a5.996 5.996 0 0 1 1.924-1.626L12 16h3l-3 3m0 0-3 3" />
        </svg>
      ),
      bio: 'Ensuring regulatory compliance and fund transparency',
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="py-20 px-4 bg-gradient-to-br from-red-50 via-white to-red-50/30">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">About CureLedger</h1>
          <p className="text-xl text-muted-foreground">
            Building trust and transparency in healthcare crowdfunding
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-heading text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              At CureLedger, we believe healthcare shouldn&apos;t be a luxury. Our mission is to
              democratize access to medical treatment by connecting patients with compassionate
              donors through a transparent, verified platform.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We eliminate middlemen, verify authenticity through hospitals, and ensure funds
              reach those who need them most.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-red-50 flex items-center justify-center">
              <svg className="w-12 h-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M4.5 15.75h12a2.25 2.25 0 002.25-2.25v-1.5a2.25 2.25 0 00-2.25-2.25h-12A2.25 2.25 0 001.5 12.75v1.5a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 bg-red-50/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading text-3xl font-bold mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-border bg-white">
              <CardHeader>
                <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </div>
                <CardTitle className="font-heading">Transparency</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Every donation tracked, every step verified, complete visibility for donors
              </CardContent>
            </Card>

            <Card className="border-border bg-white">
              <CardHeader>
                <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                  </svg>
                </div>
                <CardTitle className="font-heading">Security</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Bank-level encryption, secure payment processing, protected personal data
              </CardContent>
            </Card>

            <Card className="border-border bg-white">
              <CardHeader>
                <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                  </svg>
                </div>
                <CardTitle className="font-heading">Compassion</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Supporting those in medical need with dignity and respect
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading text-3xl font-bold mb-12 text-center">Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <Card key={i} className="border-border">
                <CardContent className="pt-6">
                  <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mb-4 mx-auto">
                    <div className="text-primary">{member.icon}</div>
                  </div>
                  <h3 className="text-lg font-semibold mb-1 text-center">{member.name}</h3>
                  <p className="text-sm text-primary font-medium mb-3 text-center">{member.role}</p>
                  <p className="text-sm text-muted-foreground text-center">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-4 bg-primary text-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold mb-2">150+</p>
              <p className="opacity-90">Hospitals Partnered</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">50K+</p>
              <p className="opacity-90">Lives Impacted</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">₦2.5B+</p>
              <p className="opacity-90">Funds Raised</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">99.9%</p>
              <p className="opacity-90">Transparency Rate</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
