import { CircleCheck, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type ParsedRecipe = {
  title: string;
  ingredients: string[];
  instructions: string[];
};



function parseRecipeResponse(rawInput: string): ParsedRecipe | undefined {
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
      return;
    }
  } catch (err) {
    console.error(err);
    return;
  }
}

export function RecipeSummary({ str }: { str: string }) {
  const recipe = parseRecipeResponse(str);
  if (!recipe) {
    return null;
  }

  const Ingredients = () => {
    return recipe.ingredients.map((ingredient: string) => (
      <li key={ingredient}>
        <small className="text-sm font-normal leading-none">{ingredient}</small>
      </li>
    ));
  };

  const Instructions = () => {
    return recipe.instructions.map((instruction: string, index: number) => (
      <li key={index}>
        <small className="text-sm font-normal leading-none">
          {instruction}
        </small>
      </li>
    ));
  };

  return (
    <Dialog>
      <DialogTrigger className="mt-3">
        <Button variant="outline">
          <CircleCheck /> Recipe ready, click to view!
        </Button>
      </DialogTrigger>
      <DialogContent className="lg:max-w-screen-lg overflow-y-auto max-h-screen printContent">
        <DialogHeader>
          <DialogTitle>{recipe.title}</DialogTitle>
        </DialogHeader>
        <section>
          <h4 className="scroll-m-20 text-lg font-semibold tracking-tight">
            Ingredients
          </h4>
          <ul className="mt-2 mb-6 ml-4 list-disc">
            <Ingredients />
          </ul>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Instructions
          </h4>
          <ol className="my-6 ml-6 list-decimal">
            <Instructions />
          </ol>
        </section>
        <Button
          className="max-w-32 align-middle justify-center printButton"
          onClick={() => {
            saveAndDownload(recipe);
          }}
        >
          <Download />
          Save (JSON)
        </Button>
      </DialogContent>
    </Dialog>
  );
}
