import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

/*
example string:

{title: Best Chicken Parmesan Recipe}
{ingredients: chicken breast, mozzarella cheese, spaghetti sauce, parsley, all-purpose flour, salt and pepper, seasoned bread crumbs, eggs, water or milk}
{instructions: 1. Flatten the skinless boneless chicken breasts with a meat mallet. 2. Set up a breading station with flour, egg wash, and bread crumbs. 3. Coat the chicken breasts with the seasoned flour and then the egg wash. 4. Heat a large saute pan on high heat and add vegetable oil. 5. Carefully place the breaded chicken cutlets into the oil and cook until golden brown. 6. Drain the fried chicken cutlets on baking racks and top with spaghetti sauce and mozzarella cheese. 7. Sprinkle parsley on top and bake at 350 degrees F for 20 minutes.}


*/

const str =
  "{title: Best Chicken Parmesan Recipe}{ingredients: chicken breast, mozzarella cheese, spaghetti sauce, parsley, all-purpose flour, salt and pepper, seasoned bread crumbs, eggs, water or milk}{instructions: 1. Flatten the skinless boneless chicken breasts with a meat mallet. 2. Set up a breading station with flour, egg wash, and bread crumbs. 3. Coat the chicken breasts with the seasoned flour and then the egg wash. 4. Heat a large saute pan on high heat and add vegetable oil. 5. Carefully place the breaded chicken cutlets into the oil and cook until golden brown. 6. Drain the fried chicken cutlets on baking racks and top with spaghetti sauce and mozzarella cheese. 7. Sprinkle parsley on top and bake at 350 degrees F for 20 minutes.}";

function parseRecipeResponse(rawInput: string) {
  console.log("rawInput", rawInput);
  try {
    const parsed = JSON.parse(rawInput);
    if (parsed?.title && parsed?.instructions && parsed?.ingredients) {
      return {
        title: parsed.title,
        ingredients: parsed.ingredients,
        instructions: parsed.instructions,
      };
    } else {
      console.error("Invalid recipe format");
      return null;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
}

export function RecipeSummary({ str }: { str: string }) {
  const recipe = parseRecipeResponse(str);
  if (!recipe) {
    return null;
  }

  const ingredients = () => {
    return recipe.ingredients.map((ingredient: string) => (
      <li key={ingredient}>{ingredient}</li>
    ));
  };

  const instructions = () => {
    return recipe.instructions.map((instruction: string, index: number) => (
      <li key={index}>{instruction}</li>
    ));
  };

  return (
    <Dialog>
      <DialogTrigger className="mt-3">
        Recipe ready, click to view!
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{recipe.title}</DialogTitle>
          <DialogDescription>
            Ingredients
            <ul>{ingredients()}</ul>
          </DialogDescription>
          <DialogDescription>
            Instructions
            <ul>{instructions()}</ul>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
