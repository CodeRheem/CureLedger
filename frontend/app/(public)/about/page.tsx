'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function About() {
  const team = [
    {
      name: 'Dr. Amina Hassan',
      role: 'Founder & CEO',
      icon: '👩‍⚕️',
      bio: 'Healthcare innovator with 15 years in medical fundraising',
    },
    {
      name: 'Chukwu Okafor',
      role: 'CTO',
      icon: '👨‍💻',
      bio: 'Tech visionary building transparent healthcare platforms',
    },
    {
      name: 'Grace Adeyemi',
      role: 'Head of Compliance',
      icon: '⚖️',
      bio: 'Ensuring regulatory compliance and fund transparency',
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">About CureLedger</h1>
          <p className="text-xl text-muted-foreground">
            Building trust and transparency in healthcare crowdfunding
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              At CureLedger, we believe healthcare shouldn't be a luxury. Our mission is to
              democratize access to medical treatment by connecting patients with compassionate
              donors through a transparent, verified platform.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We eliminate middlemen, verify authenticity through hospitals, and ensure funds
              reach those who need them most.
            </p>
          </div>
          <div className="text-5xl">🏥</div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 bg-muted">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 bg-background">
              <CardHeader>
                <div className="text-4xl mb-4">✨</div>
                <CardTitle>Transparency</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Every donation tracked, every step verified, complete visibility for donors
              </CardContent>
            </Card>

            <Card className="border-0 bg-background">
              <CardHeader>
                <div className="text-4xl mb-4">🔒</div>
                <CardTitle>Security</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Bank-level encryption, secure payment processing, protected personal data
              </CardContent>
            </Card>

            <Card className="border-0 bg-background">
              <CardHeader>
                <div className="text-4xl mb-4">🤝</div>
                <CardTitle>Compassion</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Supporting those in medical need with dignity and respect
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <Card key={i}>
                <CardContent className="pt-6">
                  <div className="text-5xl mb-4">{member.icon}</div>
                  <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                  <p className="text-sm text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
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
