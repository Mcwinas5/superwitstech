content = open('/home/ubuntu/superwits-tech/client/src/pages/Home.tsx', encoding='utf-8').read()

FB = '<p style={{ fontFamily: "\'Inter\', sans-serif", fontSize: "13px", fontWeight: 400, color: "#9CA3AF", marginTop: "10px", textAlign: "center" }}>\u2713 Free \u2713 No Commitment \u2713 5-Minute Video</p>'

# Missing #5 — Hero primary CTA: the first button in the flex row
# It ends with </button>\n                </a>\n                <a href={WA_LINK} (the secondary CTA follows)
old5 = '''                  >
                    Get My Free Website Audit
                  </button>
                </a>
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="block w-full sm:w-auto" onClick={WA_CLICK}>'''
new5 = '''                  >
                    Get My Free Website Audit
                  </button>
                </a>
                ''' + FB + '''
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="block w-full sm:w-auto" onClick={WA_CLICK}>'''
content = content.replace(old5, new5, 1)

# Missing #6 — Case studies section bottom CTA (the standalone one below the 3 cards)
# It ends with </a>\n          </div>\n        </div>\n      </section>\n\n      {/* ── SECTION 7 — CASE STUDIES
# Wait — section 7 IS case studies. Let me look for the bottom CTA of How It Works (section 6)
# From the debug: char 25273 is inside How It Works section bottom CTA
# It ends: </button>\n            </a>\n          </div>\n        </div>\n      </section>\n\n      {/* ── SECTION 7 — CASE STUDIES
old6 = '''              >
                Get My Free Website Audit
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* \u2500\u2500 SECTION 7 \u2014 CASE STUDIES'''
new6 = '''              >
                Get My Free Website Audit
              </button>
            </a>
            <p style={{ fontFamily: "\'Inter\', sans-serif", fontSize: "13px", fontWeight: 400, color: "#9CA3AF", marginTop: "10px" }}>\u2713 Free \u2713 No Commitment \u2713 5-Minute Video</p>
          </div>
        </div>
      </section>

      {/* \u2500\u2500 SECTION 7 \u2014 CASE STUDIES'''
content = content.replace(old6, new6, 1)

with open('/home/ubuntu/superwits-tech/client/src/pages/Home.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

count = content.count('No Commitment')
print(f"Fear-buster count now: {count}")
