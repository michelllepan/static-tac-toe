"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home({ params }: { params: { state: string } }) {
  const router = useRouter();
  const turn = params.state.charAt(0);

  const handleButtonClick = (cell: number) => {
    if (params.state.charAt(cell + 2) !== "b") {
      return params.state;
    } else {
      return (
        (turn === "x" ? "o" : "x") +
        "-" +
        params.state.substring(2, cell + 2) +
        turn +
        params.state.substring(cell + 3)
      );
    }
  };

  const checkWinCondition = (board: string) => {
    for (let i = 0; i < 3; i++) {
      if (
        board[i * 3] !== "b" &&
        board[i * 3] === board[i * 3 + 1] &&
        board[i * 3] === board[i * 3 + 2]
      ) {
        return board[i * 3]; // Return the winning symbol ('X' or 'O')
      }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
      if (
        board[i] !== "b" &&
        board[i] === board[i + 3] &&
        board[i] === board[i + 6]
      ) {
        return board[i]; // Return the winning symbol ('X' or 'O')
      }
    }

    // Check diagonals
    if (board[0] !== "b" && board[0] === board[4] && board[0] === board[8]) {
      return board[0]; // Return the winning symbol ('X' or 'O')
    }

    if (board[2] !== "b" && board[2] === board[4] && board[2] === board[6]) {
      return board[2]; // Return the winning symbol ('X' or 'O')
    }

    return null; // No win condition found
  };

  const checkBoardFull = (board: string) => {
    for (let i = 0; i < 9; i++) {
      if (board.charAt(i) === "b") {
        return false;
      }
    }
    return true;
  };

  const winner = checkWinCondition(params.state.substring(2));

  return (
    <main className="flex min-h-screen flex-col items-center justify-center -24">
      {(winner && <p>winner: {winner}</p>) ||
        (checkBoardFull(params.state.substring(2)) && <p>draw</p>) || (
          <p>current turn: {turn}</p>
        )}
      <br></br>
      <div className="grid grid-rows-3 grid-cols-3">
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            id={"id" + i}
            className={
              params.state.charAt(i + 2) === "b"
                ? "grid-cell cursor-pointer"
                : "grid-cell cursor-default"
            }
            onClick={() => router.push(`/${handleButtonClick(i)}`)}
          >
            {params.state.charAt(i + 2) === "b"
              ? " "
              : params.state.charAt(i + 2)}
          </div>
        ))}
      </div>
      <br></br>
      <button onClick={() => router.push("/")}>new game</button>
    </main>
  );

  // useEffect(() => {
  //   setTimeout(() => {
  //     router.push('/mehul')
  //   }, 2000)
  // }, [])
  return (
    <>
      <p>{params.state}</p>
      <main className="flex min-h-screen flex-col items-center justify-center -24">
        <div className="grid grid-rows-3 grid-cols-3">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              id={"id" + i}
              className="grid-cell"
              onClick={() => router.push(`/${i}`)}
            >
              {i}
            </div>
          ))}
        </div>
      </main>
      <button onClick={() => router.push("/mehul")}>go to mehul</button>
    </>
  );
}
