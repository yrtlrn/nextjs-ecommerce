import { redirect } from "next/navigation";
import { prisma } from "../lib/db/prisma";
import FormSubmitButton from "../components/FormSubmitButton";

export const metadata = {
  title: "Add Product - Flowmazon",
};

async function addProduct(formData: FormData) {
  "use server";

  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();
  const price = Number(formData.get("price") || 0);

  if (!name || !description || !imageUrl || !price) {
    throw Error("Missing required fields");
  }

  await prisma.product.create({
    data: {
      name,
      description,
      imageUrl,
      price,
    },
  });
  redirect("/");
}

export default function AddProductPage() {
  return (
    <div>
      <h1 className="mb-3 text-xl font-bold">Add Product</h1>
      <form action={addProduct}>
        <input
          required
          name="name"
          placeholder="Name"
          className="input input-bordered mb-3 w-full"
        />
        <textarea
          required
          name="description"
          placeholder="Description"
          className="textarea textarea-bordered mb-3 w-full"
        />
        <input
          required
          name="imageUrl"
          placeholder="Image URL"
          type="url"
          className="input input-bordered mb-3 w-full"
        />
        <input
          required
          name="price"
          placeholder="Price"
          type="number"
          className="input input-bordered mb-3 w-full"
        />
        <FormSubmitButton className=" btn-block ">
          Add Product
        </FormSubmitButton>
      </form>
    </div>
  );
}

/*
Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus repellat velit, quam nobis molestias ipsum, repudiandae consequuntur provident quasi nesciunt harum sapiente dolorum ipsa illum soluta esse ea perspiciatis consequatur!


*/
