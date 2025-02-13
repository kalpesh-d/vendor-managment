import { NextResponse } from "next/server"
// import { auth } from "@/auth"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(req) {
  // const session = await auth()
  // if (!session?.user?.email) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  // }

  const vendors = await prisma.vendor.findMany({})

  return NextResponse.json({ vendors })
}

export async function POST(req) {
  // const session = await auth()
  // if (!session?.user?.email) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  // }

  const data = await req.json()

  const {
    name,
    bankAccountNo,
    bankName,
    addressLine1,
    addressLine2,
    city,
    country,
    zipCode
  } = data
  // const user = await prisma.user.findUnique({
  //   where: { email: session.user.email }
  // })

  // if (!user) {
  //   return NextResponse.json({ error: "User not found" }, { status: 404 })
  // }

  // Create vendor with user relationship
  const vendor = await prisma.vendor.create({
    data: {
      name,
      bankAccountNo,
      bankName,
      addressLine1,
      addressLine2,
      city,
      country,
      zipCode,
      userId: user.id
    }
  })

  return NextResponse.json(vendor)
}