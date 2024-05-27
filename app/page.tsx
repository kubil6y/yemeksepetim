import { Button } from "@/components/ui/button";
import { db } from "@/db/drizzle";
import { usersSchema } from "@/db/schema";
import { createId} from "@paralleldrive/cuid2";

async function insert() {
    await db.insert(usersSchema).values([
        {
            id: createId(),
            name: "kubilay",
        },
    ]);
}

export default async function Home() {
    await insert();
    return (
        <div>
            <Button>Create</Button>
        </div>
    );
}
