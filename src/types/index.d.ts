export interface Data{
country: string  | null | undefined,
_id: string ,
intensity: number | null | undefined,
sector: string | null | undefined,
topic: string | null | undefined,
insight: string | null | undefined,
url: string | null | undefined,
region: string  | null | undefined,
added: Date | null | undefined,
published: Date | null | undefined,
country: string | null | undefined,
relevance: number | null | undefined,
source: string | null | undefined,
title: string | null | undefined,
likelihood: number | null | undefined,

}

export interface Data extends Array<Data>{}