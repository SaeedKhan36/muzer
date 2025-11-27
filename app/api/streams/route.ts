import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";
import { z } from "zod";

const CreateStreamSchema = z.object({
    creatorId: z.string(),
    url: z.string(), // youtube or spotify
});

export async function POST(req: NextRequest) {
    try {
        const data = CreateStreamSchema.parse(await req.json());
        const isYt = data.url.includes("youtube");
        const isSpotify = data.url.includes("spotify");

        if (!isYt && !isSpotify) {
            return NextResponse.json(
                {
                    message: "Wrong format",
                },
                {
                    status: 411,
                }
            );
        }

        const stream = await prisma.stream.create({
            data: {
                userId: data.creatorId,
                url: data.url,
                extractedId: isYt ? isYt[1] : isSpotify ? isSpotify[1] : "",
                type: isYt ? "Youtube" : "Spotify",
            },
        });

        return NextResponse.json({
            message: "Added Stream",
            id: stream.id,
        });
    } catch (e) {
        return NextResponse.json(
            {
                message: "Error while adding a stream",
            },
            {
                status: 411,
            }
        );
    }
}

