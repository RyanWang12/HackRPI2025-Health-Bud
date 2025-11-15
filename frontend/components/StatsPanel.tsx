import React, { useState } from "react";
import { JSX } from "react";
type UserStats = {
  name: string;
  age: number;
  weight: number;
  diet: string;
  goal: string;
};

type UserStatsSelect = {
  name: boolean;
  age: boolean;
  weight: boolean;
  diet: boolean;
  goal: boolean;
};

export default function StatsPanel(): JSX.Element {
  const [userstats, changeStats] = useState<UserStats>({
    name: "",
    age: 67,
    weight: 150,
    diet: "",
    goal: "",
  });

  const [userstatsSelect, changeUserSelect] = useState<UserStatsSelect>({
    name: false,
    age: false,
    weight: false,
    diet: false,
    goal: false,
  });

  const clickedForm = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    const field = event.currentTarget.name as keyof UserStatsSelect;

    changeUserSelect((prev: UserStatsSelect): UserStatsSelect => ({
      ...prev,
      [field]: true,
    }));
  };

  const handleEnter = (
    event: React.KeyboardEvent<HTMLInputElement>,
    field: keyof UserStats
  ): void => {
    if (event.key !== "Enter") return;

    const value: string = event.currentTarget.value;

    changeStats((prev: UserStats): UserStats => {
      if (field === "age" || field === "weight") {
        const num: number = Number(value);
        return {
          ...prev,
          [field]: Number.isNaN(num) ? 0 : num,
        };
      }

      return {
        ...prev,
        [field]: value,
      };
    });

    changeUserSelect((prev: UserStatsSelect): UserStatsSelect => ({
      ...prev,
      [field]: false,
    }));
  };

  const handleDietChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const value: string = event.currentTarget.value;

    changeStats((prev: UserStats): UserStats => ({
      ...prev,
      diet: value,
    }));

    changeUserSelect((prev: UserStatsSelect): UserStatsSelect => ({
      ...prev,
      diet: false,
    }));
  };

  return (
    <div className="flex items-center justify-center border-4 border-white">
      {/* Left: User stats editable panel */}
      <div className="w-full max-w-sm bg-black p-4 text-2xl space-y-2">

        {/* NAME */}
        {userstatsSelect.name ? (
          <div className="flex items-center justify-between">
            <label className="mr-2">Name:</label>
            <input
              defaultValue={userstats.name}
              type="text"
              name="name"
              className="bg-black border border-white text-white px-2 w-40"
              onKeyDown={(e): void => handleEnter(e, "name")}
            />
          </div>
        ) : (
          <button
            name="name"
            onClick={clickedForm}
            className="flex items-center justify-between w-full text-left"
          >
            <span>Name:</span>
            <span>{userstats.name || "—"}</span>
          </button>
        )}

        {/* AGE */}
        {userstatsSelect.age ? (
          <div className="flex items-center justify-between">
            <label className="mr-2">Age:</label>
            <input
              defaultValue={userstats.age}
              type="number"
              name="age"
              className="bg-black border border-white text-white px-2 w-24"
              onKeyDown={(e): void => handleEnter(e, "age")}
            />
          </div>
        ) : (
          <button
            name="age"
            onClick={clickedForm}
            className="flex items-center justify-between w-full text-left"
          >
            <span>Age:</span>
            <span>{userstats.age}</span>
          </button>
        )}

        {/* WEIGHT */}
        {userstatsSelect.weight ? (
          <div className="flex items-center justify-between">
            <label className="mr-2">Weight:</label>
            <input
              defaultValue={userstats.weight}
              type="number"
              name="weight"
              className="bg-black border border-white text-white px-2 w-24"
              onKeyDown={(e): void => handleEnter(e, "weight")}
            />
          </div>
        ) : (
          <button
            name="weight"
            onClick={clickedForm}
            className="flex items-center justify-between w-full text-left"
          >
            <span>Weight:</span>
            <span>{userstats.weight}</span>
          </button>
        )}

        {/* DIET (dropdown: good / ok / bad) */}
        {userstatsSelect.diet ? (
          <div className="flex items-center justify-between">
            <label className="mr-2">Diet:</label>
            <select
              name="diet"
              className="bg-black border border-white text-white px-2 w-40"
              value={userstats.diet || ""}
              onChange={handleDietChange}
            >
              <option value="" disabled>
                Select…
              </option>
              <option value="good">Good</option>
              <option value="ok">Ok</option>
              <option value="bad">Bad</option>
            </select>
          </div>
        ) : (
          <button
            name="diet"
            onClick={clickedForm}
            className="flex items-center justify-between w-full text-left"
          >
            <span>Diet:</span>
            <span>{userstats.diet || "—"}</span>
          </button>
        )}

        {/* GOAL */}
        {userstatsSelect.goal ? (
          <div className="flex items-center justify-between">
            <label className="mr-2">Goal:</label>
            <input
              defaultValue={userstats.goal}
              type="text"
              name="goal"
              className="bg-black border border-white text-white px-2 w-40"
              onKeyDown={(e): void => handleEnter(e, "goal")}
            />
          </div>
        ) : (
          <button
            name="goal"
            onClick={clickedForm}
            className="flex items-center justify-between w-full text-left"
          >
            <span>Goal:</span>
            <span>{userstats.goal || "—"}</span>
          </button>
        )}
      </div>

      {/* Right: static health summary panel */}
      <div className="w-full max-w-sm border-x-2 border-white bg-black p-4 text-2xl space-y-2">
        <div>🧍 BMI: 22.3 (Normal)</div>
        <div>🔥 Daily Calories: 2350 kcal</div>
        <div>😴 Sleep Target: 7–9 hrs</div>
        <div>💧 Water Goal: 2.5 L</div>
        <div className="mt-2">
          ⚡ Energy:
          <span className="ml-2">████░░</span>
        </div>
      </div>
    </div>
  );
}
