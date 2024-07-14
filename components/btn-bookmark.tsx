"use client"

import { cn } from "@/lib/utils";
import { useAppSelector } from "@/store/hooks";
import { BooksData } from "@/types/types";
import { stagger, useAnimate, animate } from "framer-motion";
import { Heart } from "lucide-react";

const randomNumberBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

type AnimationSequence = Parameters<typeof animate>[0];

interface BtnBookmark {
  onClick?: () => void
  listNameEncoded: string
}

const BtnBookmark = ({ onClick, listNameEncoded }: BtnBookmark) => {
  const [scope, animate] = useAnimate();
  const { bookmark } = useAppSelector(state => state.bookmarks)

  const alreadyBookmark = bookmark.find((book: BooksData) => book.list_name_encoded === listNameEncoded)

  const onButtonClick = () => {
    onClick && onClick()

    if (alreadyBookmark) {
      return
    }

    const sparkles = Array.from({ length: 20 });
    const sparklesAnimation: AnimationSequence = sparkles.map((_, index) => [
      `.sparkle-${index}`,
      {
        x: randomNumberBetween(-100, 100),
        y: randomNumberBetween(-100, 100),
        scale: randomNumberBetween(1.5, 2.5),
        opacity: 1,
      },
      {
        duration: 0.4,
        at: "<",
      },
    ]);

    const sparklesFadeOut: AnimationSequence = sparkles.map((_, index) => [
      `.sparkle-${index}`,
      {
        opacity: 0,
        scale: 0,
      },
      {
        duration: 0.3,
        at: "<",
      },
    ]);

    const sparklesReset: AnimationSequence = sparkles.map((_, index) => [
      `.sparkle-${index}`,
      {
        x: 0,
        y: 0,
      },
      {
        duration: 0.000001,
      },
    ]);

    animate([
      ...sparklesReset,
      [".letter", { y: -32 }, { duration: 0.2, delay: stagger(0.05) }],
      ["button", { scale: 0.8 }, { duration: 0.1, at: "<" }],
      ["button", { scale: 1 }, { duration: 0.1 }],
      ...sparklesAnimation,
      [".letter", { y: 0 }, { duration: 0.000001 }],
      ...sparklesFadeOut,
    ]);

  };

  return (
    <div ref={scope}>
      <button
        onClick={onButtonClick}
        className="relative rounded-lg transition-colors hover:bg-rose-100 flex items-center p-1"
      >
        <Heart size={16} className={cn(alreadyBookmark ? "text-rose-500" : "text-slate-400")} />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 block"
        >
          {Array.from({ length: 20 }).map((_, index) => (
            <Heart key={index} size={16} className={`text-rose-500 absolute left-1/2 top-1/2 opacity-0 sparkle-${index}`} />
          ))}
        </span>
      </button>
    </div>
  )
}
export default BtnBookmark