import { Mail, Phone, Linkedin, Github, MapPin, Send } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "pranavtdhote@gmail.com",
    href: "mailto:pranavtdhote@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 8446432484",
    href: "tel:+918446432484",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Pune, Maharashtra, India",
    href: null,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/pranav-dhote",
    href: "https://linkedin.com/in/pranav-dhote",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/pranavtdhote",
    href: "https://github.com/pranavtdhote",
  },
];

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This is a placeholder - in a real app, you'd send this to a backend
    toast.success("Message sent! I'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl font-bold font-heading mb-4 animate-fade-in text-center">
          Get In Touch
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          I'm always open to discussing new opportunities, collaborations, or just having a chat about technology.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-4 animate-fade-in">
            <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
            {contactInfo.map((info, i) => {
              const Icon = info.icon;
              const content = (
                <Card className="p-4 bg-card border-border hover:border-primary/50 transition-all hover:shadow-glow">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{info.label}</p>
                      <p className="text-foreground font-medium">{info.value}</p>
                    </div>
                  </div>
                </Card>
              );

              return info.href ? (
                <a key={i} href={info.href} target={info.href.startsWith('http') ? '_blank' : undefined} rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}>
                  {content}
                </a>
              ) : (
                <div key={i}>{content}</div>
              );
            })}
          </div>

          {/* Contact Form */}
          <Card className="p-6 bg-card border-border animate-fade-in">
            <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="bg-secondary border-border"
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-secondary border-border"
                />
              </div>
              <div>
                <Textarea
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                  className="bg-secondary border-border resize-none"
                />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
