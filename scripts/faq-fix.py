#!/usr/bin/env python3
"""Replace FAQ details/summary with FaqItem component in page.tsx"""

with open("/home/z/my-project/src/app/page.tsx", "r") as f:
    lines = f.readlines()

start_marker = '            <div className="space-y-4 mb-12">\n'
faq_comment = '            {/* CTA after FAQ */}\n'

start_idx = None
end_idx = None
for i, line in enumerate(lines):
    if line == start_marker:
        start_idx = i
    if start_idx is not None and line == faq_comment:
        end_idx = i
        break

if start_idx is None or end_idx is None:
    print(f"ERROR: start={start_idx}, end={end_idx}")
    exit(1)

print(f"Replacing lines {start_idx+1} to {end_idx} (inclusive)")

new_block = '''            <div className="space-y-4 mb-12">
              {[
                {
                  q: "I\\'ve paid for websites before and they didn\\'t work. Why will this be different?",
                  a: "Because we do not build \\'websites\\' \\u2014 we build conversion systems. Every page has a single goal, backed by our 7 Pillars Framework. We measure success by clients acquired, not pages delivered. Plus, we start with a free audit so you can see the problems before spending a naira.",
                },
                {
                  q: "How much does it cost?",
                  a: "The free audit is, well, free \\u2014 no strings attached. For full builds, pricing depends on the scope and your conversion goals. We will give you a clear quote during the strategy call with no hidden fees. Think of it this way: what is one new client worth to your business?",
                },
                {
                  q: "How long does it take?",
                  a: "AI-accelerated builds are delivered in days, not weeks. A typical Conversion Website Build takes 5\\u201310 business days. A Client Acquisition System may take 2\\u20133 weeks including follow-up automation setup.",
                },
                {
                  q: "My clients don\\'t really use the internet...",
                  a: "They do \\u2014 more than you think. Over 60% of Nigerians are online, and mobile internet usage is among the highest in Africa. Your ideal clients are searching Google right now for the service you offer. If they find your competitor first, they call your competitor.",
                },
                {
                  q: "Can you work with businesses outside Nigeria?",
                  a: "Yes. While our expertise is rooted in the Nigerian market, our conversion framework is universal. We have worked with businesses across West Africa and the diaspora.",
                },
                {
                  q: "What if I already have a website?",
                  a: "Perfect \\u2014 that is exactly what our free audit is for. We will review your existing site, identify the conversion leaks, and show you exactly what to fix. If a rebuild makes sense, we will tell you. If a few tweaks will do it, we will tell you that too.",
                },
                {
                  q: "What do I need to provide?",
                  a: "Very little. We handle the strategy, design, copywriting, and development. You just need to share your brand assets (logo, colours if you have them), access to your domain/hosting if applicable, and 30 minutes for a strategy call. That is it.",
                },
              ].map((faq, idx) => (
                <FaqItem
                  key={faq.q}
                  question={faq.q}
                  answer={faq.a}
                  isOpen={openFaq === idx}
                  onToggle={() => toggleFaq(idx)}
                />
              ))}
            </div>

'''

# Replace from start_idx to end_idx (exclusive of end_idx which is the comment line)
lines[start_idx:end_idx] = [new_block]

with open("/home/z/my-project/src/app/page.tsx", "w") as f:
    f.writelines(lines)

print("Done. FAQ block replaced.")