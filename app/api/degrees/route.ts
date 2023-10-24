import { NextResponse } from "next/server";
import { prisma } from "@/libs";

export async function GET(request: Request) {
  try {
    const degrees = await prisma.degree.findFirst()
    return NextResponse.json({ degrees }, {status: 200})
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Not found' }, {status: 404})
  }
}

// export async function getStaticProps () {
//   return {
//     props: {
//       degrees // esto pasa los registros de ingresos como props al componente
//     },
//     revalidate: 10 // esto indica que la página se regenerará cada 10 segundos en el servidor
//   }
// }