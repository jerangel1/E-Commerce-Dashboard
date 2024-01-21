import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function SetupLayout({
children,
params
}: {
    children: React.ReactNode;
    params: {storeId:string}
}) {
    const { userId }= auth ();

    if (!userId) {
        redirect ('/sign-in');
    }
    const store = await prismadb.store.findFirst({
        where: {
            id:params.storeId,
            userId
        }
        });
        // If the current user is not the owner of the store then we should redirect them
        if (store) {
            redirect (`/${store.id}`);
        }
        return(
            <>
            <div>
            {children}
            </div>
            </>
        );
    };
