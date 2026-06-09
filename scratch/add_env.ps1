$dbUrl = "postgresql://postgres.ygbdsynaryoppjtaulsq:Nobitano@123@aws-1-ap-southeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"
$directDbUrl = "postgresql://postgres.ygbdsynaryoppjtaulsq:Nobitano@123@aws-1-ap-southeast-2.pooler.supabase.com:5432/postgres"
$adminPass = "Abtrip@2026"

Write-Host "Adding DATABASE_URL to Vercel (production)..."
npx vercel env add DATABASE_URL production --value $dbUrl --yes
Write-Host "Adding DATABASE_URL to Vercel (development)..."
npx vercel env add DATABASE_URL development --value $dbUrl --yes

Write-Host "Adding DIRECT_DATABASE_URL to Vercel (production)..."
npx vercel env add DIRECT_DATABASE_URL production --value $directDbUrl --yes
Write-Host "Adding DIRECT_DATABASE_URL to Vercel (development)..."
npx vercel env add DIRECT_DATABASE_URL development --value $directDbUrl --yes

Write-Host "Adding ADMIN_PASSWORD to Vercel (production)..."
npx vercel env add ADMIN_PASSWORD production --value $adminPass --yes
Write-Host "Adding ADMIN_PASSWORD to Vercel (development)..."
npx vercel env add ADMIN_PASSWORD development --value $adminPass --yes

Write-Host "All environment variables added successfully!"
