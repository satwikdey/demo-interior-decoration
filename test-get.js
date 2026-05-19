async function testGet() {
  const res = await fetch("http://localhost:3000/api/projects/by-slug/Mustard%20Oil");
  console.log(res.status);
  const text = await res.text();
  console.log(text);
}
testGet();
