import { Mail, Phone, Linkedin, Github, MapPin, Send, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMemo, useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const contactInfo = [
  { icon: Mail, label: "Email", value: "pranavtdhote@gmail.com", href: "mailto:pranavtdhote@gmail.com" },
  { icon: Phone, label: "Phone", value: "+91 8446432484", href: "tel:+918446432484" },
  { icon: MapPin, label: "Location", value: "Pune, Maharashtra, India", href: null },
  { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/pranav-dhote", href: "https://linkedin.com/in/pranav-dhote-1412b4241" },
  { icon: Github, label: "GitHub", value: "github.com/pranavtdhote", href: "https://github.com/pranavtdhote" },
];

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedOk, setSubmittedOk] = useState<null | boolean>(null);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const termRef = useRef<HTMLDivElement>(null);

  const isNameValid = useMemo(() => formData.name.trim().length >= 2, [formData.name]);
  const isEmailValid = useMemo(() => /.+@.+\..+/.test(formData.email), [formData.email]);
  const isMessageValid = useMemo(() => formData.message.trim().length >= 10, [formData.message]);

  // Auto-scroll terminal output
  useEffect(() => {
    if (termRef.current) {
      termRef.current.scrollTop = termRef.current.scrollHeight;
    }
  }, [terminalOutput]);

  const addTerminalLine = (line: string, delay: number = 0) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setTerminalOutput((prev) => [...prev, line]);
        resolve();
      }, delay);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmittedOk(null);
    setTerminalOutput([]);

    await addTerminalLine("$ send-message --to pranav@dev", 0);
    await addTerminalLine(`  name: "${formData.name}"`, 300);
    await addTerminalLine(`  email: "${formData.email}"`, 300);
    await addTerminalLine(`  message: "${formData.message.slice(0, 50)}..."`, 300);
    await addTerminalLine("  sending...", 500);

    try {
      // Using Web3Forms to send directly to your email.
      // NOTE: You must replace "YOUR_WEB3FORMS_ACCESS_KEY_HERE" with your actual Web3Forms access key
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          access_key: "93cbe86f-c6a5-41ed-8838-875e002103b8",
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `New Portfolio Message from ${formData.name}`,
        }),
      });

      const result = await response.json();

      if (response.status === 200) {
        await addTerminalLine("  ✓ message sent successfully!", 500);
        toast.success("Message sent successfully! I'll get back to you soon.");
        setFormData({ name: "", email: "", message: "" });
        setSubmittedOk(true);
      } else {
        await addTerminalLine(`  ✗ error: ${result.message || "failed to send"}`, 500);
        toast.error(result.message || "Failed to send message. Please try again.");
        setSubmittedOk(false);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      await addTerminalLine("  ✗ error: connection failed", 500);
      toast.error("Failed to send message. Please check your connection and try again.");
      setSubmittedOk(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">📬</span>
            <h2 className="text-3xl md:text-4xl font-bold font-mono">
              <span className="text-primary">~/</span>contact
            </h2>
          </div>
          <p className="text-muted-foreground mb-12 max-w-2xl font-mono text-sm">
            // open to opportunities, collaborations, or just tech talk
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-3"
          >
            {contactInfo.map((info, i) => {
              const Icon = info.icon;
              const content = (
                <div className="flex items-center gap-4 p-4 glass-panel rounded-lg hover:border-primary/20 group">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:shadow-neon/20 transition-all">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-mono">{info.label}</p>
                    <p className="text-foreground font-mono text-sm">{info.value}</p>
                  </div>
                </div>
              );
              return info.href ? (
                <a key={i} href={info.href} target={info.href.startsWith("http") ? "_blank" : undefined} rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}>
                  {content}
                </a>
              ) : (
                <div key={i}>{content}</div>
              );
            })}
          </motion.div>

          {/* Terminal-style form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="rounded-xl overflow-hidden glass-panel">
              {/* Title bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-border/30">
                <div className="terminal-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span className="text-xs font-mono text-muted-foreground">contact@pranav ~ zsh</span>
                <div className="w-12"></div>
              </div>

              {/* Form body */}
              <div className="p-5">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs font-mono text-accent mb-1 block">$ name:</label>
                    <Input
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className={`bg-[#0d1117] border font-mono text-sm ${isNameValid
                        ? "border-green-500/40 focus-visible:ring-green-500/30"
                        : formData.name
                          ? "border-red-500/40 focus-visible:ring-red-500/30"
                          : "border-border/50"
                        }`}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-accent mb-1 block">$ email:</label>
                    <Input
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className={`bg-[#0d1117] border font-mono text-sm ${isEmailValid
                        ? "border-green-500/40 focus-visible:ring-green-500/30"
                        : formData.email
                          ? "border-red-500/40 focus-visible:ring-red-500/30"
                          : "border-border/50"
                        }`}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-accent mb-1 block">$ message:</label>
                    <Textarea
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={4}
                      className={`bg-[#0d1117] border font-mono text-sm resize-none ${isMessageValid
                        ? "border-green-500/40 focus-visible:ring-green-500/30"
                        : formData.message
                          ? "border-red-500/40 focus-visible:ring-red-500/30"
                          : "border-border/50"
                        }`}
                    />
                  </div>
                  <Button
                    type="submit"
                    className={`w-full font-mono text-sm ${submittedOk === true
                      ? "bg-green-600 hover:bg-green-600/90"
                      : submittedOk === false
                        ? "bg-red-600 hover:bg-red-600/90"
                        : "bg-primary hover:bg-primary/90"
                      } text-primary-foreground shadow-neon magnetic-hover`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : submittedOk === true ? (
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                    ) : submittedOk === false ? (
                      <XCircle className="w-4 h-4 mr-2" />
                    ) : (
                      <Send className="w-4 h-4 mr-2" />
                    )}
                    {isSubmitting ? "sending..." : submittedOk === true ? "sent ✓" : submittedOk === false ? "retry" : "send_message()"}
                  </Button>
                </form>

                {/* Terminal output */}
                {terminalOutput.length > 0 && (
                  <div ref={termRef} className="mt-4 pt-3 border-t border-border/30 max-h-32 overflow-y-auto">
                    {terminalOutput.map((line, i) => (
                      <div key={i} className="text-xs font-mono text-accent/80 leading-relaxed">
                        {line}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
