import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Prompt from "./components/Prompt";
import "./style.scss";

import Grid from "./components/Grid";

const useInterval = (callback, delay, duration) => {
  const durationRef = useRef(duration);
  const durationIntervalRef = useRef();

  const handler = () => {
    callback(durationRef);
  };

  useEffect(() => {
    const durationInterval = setInterval(handler, delay);
    durationIntervalRef.current = durationInterval;
    return () => {
      clearInterval(durationInterval);
    };
  }, [delay]);

  return durationIntervalRef;
};

export default function Game() {
  const [newGame, setNewGame] = useState(false);
  const [list, setList] = useState([]);
  const [visibleItems, setVisibleItems] = useState([]);
  const [duration, setDuration] = useState(0);
  const [finishedItems, setFinishedItems] = useState([]);
  const [winner, setWinner] = useState(false);
  const [noOfTry, setNoOfTry] = useState(5);

  const checkItems = (firstIndex, secondIndex) => {
    if (
      firstIndex !== secondIndex &&
      list[firstIndex].url === list[secondIndex].url
    ) {
      setFinishedItems([...finishedItems, firstIndex, secondIndex]);
    } else {
      setNoOfTry(noOfTry - 1);
      setTimeout(() => {
        setVisibleItems([]);
      }, 600);
    }
  };

  useEffect(() => {
    if (noOfTry === 0) {
      Prompt.fire({
        title: "Zavrsena igra",
        text: "Potrosili ste sve pokusaje. Da li zelite da pokusate ponovo?",
        confirmButtonText: "Da",
        cancelButtonText: "Ne",
        preConfirm: () => {
          setNewGame(!newGame);
          setVisibleItems([]);
          setFinishedItems([]);
          setWinner(false);
          setTimeout(() => {
            setNoOfTry(5);
          }, 600);
        },
      });
    }
  }, [noOfTry]);

  useEffect(() => {
    axios
      .get(
        "https://api.unsplash.com/search/photos/?client_id=c0c103ae0af5122685dec516d4275b6471e81c388d2ce0791c61bb8f47285d5d&query=flower&per_page=6"
      )
      .then((res) => {
        const newList = res.data.results.map((item) => {
          return {
            id: item.id,
            url: item.urls.thumb,
            description: item.alt_description,
          };
        });
        setList(
          newList
            .concat(
              newList.map((item) => {
                return {
                  ...item,
                  id: item.id + "1",
                };
              })
            )
            .sort(() => {
              return 0.5 - Math.random();
            })
        );
      });
  }, [newGame]);

  const durationIntervalRef = useInterval(
    (durationRef) => {
      durationRef.current++;
      setDuration(durationRef.current);
    },
    1000,
    duration
  );

  useEffect(() => {
    if (finishedItems.length > 0 && finishedItems.length === list.length) {
      setWinner(true);
      clearInterval(durationIntervalRef.current);
      Prompt.fire({
        title: "Zavrsena igra",
        text: "Da li zelite da ponovite igru?",
        confirmButtonText: "Da",
        cancelButtonText: "Ne",
        preConfirm: () => {
          setNewGame(!newGame);
          setVisibleItems([]);
          setFinishedItems([]);
          setWinner(false);
          setTimeout(() => {
            setNoOfTry(5);
          }, 600);
        },
      });
    }
  }, [finishedItems]);

  return (
    <div className="text-center p-4 d-flex flex-column">
      <button
        onClick={() => {
          setNewGame(!newGame);
          setVisibleItems([]);
          setFinishedItems([]);
          setWinner(false);
        }}
        className="btn btn-warning mb-4"
      >
        New Game
      </button>
      {list.length === 0 ? (
        <div>...Loading</div>
      ) : (
        <div>
          <Grid
            list={list}
            visibleItems={visibleItems}
            setVisibleItems={setVisibleItems}
            finishedItems={finishedItems}
            checkItems={checkItems}
          />
          {"Broj pokusaja: " + noOfTry}
          {winner && (
            <div>
              You Win !
              <br />
              Finished in {duration} seconds
            </div>
          )}
        </div>
      )}
    </div>
  );
}
