import { MongoClient } from "mongodb";

export async function getServerSideProps(context) {
  const { name } = context.params; // Extract the "name" from the URL

  let client;

  try {
    // Connect to your MongoDB database
    client = await MongoClient.connect(process.env.MONGO_URI);
    const db = client.db();

    const character = await db
      .collection("unit base stats")
      .findOne({ Name: { $regex: new RegExp(`^${name}$`, "i") } }); // Case-insensitive matching

    // If the character isn't found, return a 404 page
    if (!character) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        character: JSON.parse(JSON.stringify(character)), // Pass the character data to the page
      },
    };
  } catch (error) {
    console.error("Error fetching character:", error);
    return {
      notFound: true,
    };
  } finally {
    client?.close();
  }
}

export default function CharacterPage({ character }) {
  return (
    <div>
      <h1>{character.Name}</h1>
      <p>More details about {character.Name}:</p>
      <ul>
        <li>Growth Rate: {character.GrowthRate}</li>
        <li>HP: {character.HP}</li>
        <li>Strength: {character.Strength}</li>
        {/* Add more details depending on the fields in your database */}
      </ul>
    </div>
  );
}
