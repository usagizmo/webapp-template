cd "$(dirname $0)/../../backend"

supabase gen types typescript --local > ../web/src/lib/\$generated/supabase-types.ts
