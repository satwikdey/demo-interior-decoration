async function testFetch() {
  const id = "cmoqo9daw0000vfhs3qqkxvho";
  const updatedData = {
    title: "Kishan 2 Kitchen",
    location: "Kolkata, India",
    category: "Private Residential",
    slug: "Mustard Oil",
    description: "Cold Pressed, 100 percent Natural, Adulteration Free Oil.",
    mainImage: "/test.jpg", // assuming it's not empty
    content: [
      { type: "TEXT", content: "Best mustard oil in the country" },
      { type: "IMAGE", content: "/test1.jpg" },
      { type: "IMAGE", content: "/test2.jpg" }
    ],
  };

  try {
    const res = await fetch(`http://localhost:3000/api/projects/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });
    const data = await res.json();
    console.log("Status:", res.status);
    console.log("Response:", data);
  } catch (err) {
    console.error("Fetch failed:", err);
  }
}
testFetch();
