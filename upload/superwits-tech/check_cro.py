content = open('/home/ubuntu/superwits-tech/client/src/pages/Home.tsx', encoding='utf-8').read()
count = content.count('No Commitment')
print(f'Fear-buster count: {count}')
for old in ['See How It Works', 'Get Results Like These', 'Learn More",', 'Claim Your Free Audit']:
    n = content.count(old)
    if n:
        print(f'STILL FOUND: {old!r} ({n}x)')
print(f'Total Get My Free Website Audit: {content.count("Get My Free Website Audit")}')
print('Done')
