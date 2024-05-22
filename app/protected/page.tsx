import DeployButton from "@/components/DeployButton";
import AuthButton from "@/components/AuthButton";
import FetchDataSteps from "@/components/tutorial/FetchDataSteps";
import Header from "@/components/Header";
import Page from "@/components/tutorial/Test";

export default async function ProtectedPage() {

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
    

      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
        <Header />
        <main className="flex-1 flex flex-col gap-6">
          
        </main>
      </div>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>
          Powered by{" "}
          <a
            href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Shipleys
          </a>
        </p>
      </footer>
    </div>
  );
}
