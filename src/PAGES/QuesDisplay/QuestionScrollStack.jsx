"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const QuestionCard = ({ ques, index, total }) => {
  const ref = useRef(null);

  useEffect(() => {
    console.log("hi this is question scroll");
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });

  // Scale down previous cards
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]);

  return (
    <div
      ref={ref}
      className="h-screen flex items-center justify-center sticky top-0"
    >
      <motion.div
        style={{
          scale,
          opacity,
          top: `-${index * 25}px`,
        }}
        className="w-[90%] max-w-6xl h-[80vh] bg-[#0f172a] rounded-2xl border border-slate-700 shadow-2xl overflow-hidden"
      >
        {/* HEADER */}
        <div className="px-8 py-6 border-b border-slate-800">
          <span className="text-xs text-emerald-400 font-bold">
            QUESTION {index + 1} / {total}
          </span>
          <h2 className="text-3xl text-white mt-2">{ques.question}</h2>
        </div>

        {/* BODY */}
        <div className="p-8 grid grid-cols-3 gap-6 h-full">
          {/* CODE */}
          <div className="col-span-1 bg-[#0b0f19] rounded-xl p-4 overflow-auto">
            <pre className="text-xs text-slate-300 whitespace-pre-wrap">
              {ques.code || "No code"}
            </pre>
          </div>

          {/* LOGIC */}
          <div className="col-span-2 bg-[#151b2b] rounded-xl p-6 overflow-auto">
            <h3 className="text-indigo-400 text-xs font-bold mb-3">
              LOGIC & APPROACH
            </h3>
            <p className="text-slate-300 leading-relaxed">
              {ques.logic || "No logic added yet."}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function QuestionScrollStack({ questions }) {
  console.log("STACK RENDERED", questions.length);

  return (
    <div className="relative">
      <div style={{ height: `${questions.length * 100}vh` }}>
        {questions.map((q, i) => (
          <QuestionCard
            key={q.id || i}
            ques={q}
            index={i}
            total={questions.length}
          />
        ))}
      </div>
    </div>
  );
}
