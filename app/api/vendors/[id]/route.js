import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(req, { params }) {
  // const session = await auth()
  // if (!session) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  // }

  const vendor = await prisma.vendor.findUnique({
    where: { id: params.id },
  })

  return NextResponse.json(vendor)
}

export async function PUT(req, { params }) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const data = await req.json()
  const vendor = await prisma.vendor.update({
    where: { id: params.id },
    data,
  })

  return NextResponse.json(vendor)
}

export async function DELETE({ params }) {
  // const session = await auth()
  // if (!session) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  // }

  await prisma.vendor.delete({
    where: { id: params.id },
  })

  return NextResponse.json({ success: true })
}