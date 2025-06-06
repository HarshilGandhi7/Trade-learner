export async function GET(request: Request) {
  const {searchParams}=new URL(request.url);
  const interval = searchParams.get('interval') || '1d';
  const range = searchParams.get('range') || '1d';
  const symbol = searchParams.get('symbol') ;


  const res = await fetch(
    `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=${interval}&range=${range}&includePrePost=false`
  );

  const data = await res.json();
  console.log("data", data);
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}
