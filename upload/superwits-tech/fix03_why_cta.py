content = open('/home/ubuntu/superwits-tech/client/src/pages/Home.tsx', encoding='utf-8').read()

# The Why Superwits.tech section ends with the closing of the differentiators grid,
# then closes the section. We insert a CTA block between the grid close and the section close.
old = '''          </div>
        </div>
      </section>

      {/* \u2500\u2500 SECTION 10 \u2014 FAQ ACCORDION'''

new = '''          </div>

          {/* FIX 03 \u2014 CRO: Mid-page CTA re-engagement after differentiators */}
          <div style={{ marginTop: "56px", borderTop: "1px solid #1A3260", paddingTop: "48px", textAlign: "center" }}>
            <h3
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(20px, 3vw, 24px)",
                color: "#F1F5F9",
                marginBottom: "28px",
              }}
            >
              Which One Is Costing You Clients Right Now?
            </h3>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="block md:inline-block" onClick={WA_CLICK}>
              <button
                className="rounded-md font-semibold transition-all duration-200 w-full md:w-auto md:px-10"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "16px",
                  fontWeight: 600,
                  backgroundColor: "#D97706",
                  color: "#FFFFFF",
                  minHeight: "48px",
                  border: "none",
                  padding: "12px 32px",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F59E0B")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#D97706")}
              >
                Get My Free Website Audit
              </button>
            </a>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 400, color: "#9CA3AF", marginTop: "10px" }}>\u2713 Free \u2713 No Commitment \u2713 5-Minute Video</p>
          </div>
        </div>
      </section>

      {/* \u2500\u2500 SECTION 10 \u2014 FAQ ACCORDION'''

content = content.replace(old, new, 1)

with open('/home/ubuntu/superwits-tech/client/src/pages/Home.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("FIX 03 applied")
print(f"Total 'No Commitment' instances: {content.count('No Commitment')}")
print(f"Total 'Get My Free Website Audit' instances: {content.count('Get My Free Website Audit')}")
