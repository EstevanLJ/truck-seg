import React from "react";
import "./Calendar.css";
import moment from "moment";
import axios from "axios";
import { Button, ButtonGroup } from "@material-ui/core";

const dows = [
    "Domingo",
    "Segunda-Feira",
    "Terça-Feira",
    "Quarta-Feira",
    "Quinta-Feira",
    "Sexta-Feira",
    "Sábado",
];
// const dows = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

const getTasks = async (from, to) => {
    let res = await axios.get(`/api/activities?from=${from}&to=${to}`);
    return res.data.data;
};

export const getRows = async (mode, currentDate, filter) => {
    let today = moment().format("YYYY-MM-DD");

    if (mode === "week") {
        let d = moment().isoWeek(currentDate).day(0);
        let firstDay = d.format("YYYY-MM-DD");

        let days = [];
        for (let i = 0; i <= 6; i++) {
            days.push({
                day: d.format("DD/MM"),
                secondary: false,
                date: d.format("YYYY-MM-DD"),
                today: d.format("YYYY-MM-DD") === today,
                formatedDate: d.format("DD/MM/YYYY"),
                dow: d.format("dddd"),
                isWeekend: d.day() === 0,
            });
            d.add(1, "d");
        }

        d.add(-1, "d");
        let lastDay = d.format("YYYY-MM-DD");
        let tasks = await getTasks(firstDay, lastDay);

        days = days.map((d) => {
            return {
                ...d,
                tasks: tasks.filter((t) => t.date === d.date),
            };
        });

        return days;
    } else if (mode === "month") {
        let year = parseInt(currentDate.split("-")[0]);
        let month = parseInt(currentDate.split("-")[1]);

        let weeks = [];
        let d = moment(`${year}-${month}-01 12:00:00`);

        d.day(0);
        let firstDay = d.format("YYYY-MM-DD");
        let foundFirst = false;
        let foundLast = false;
        let safeCounter = 6;

        while ((!foundFirst || !foundLast) && safeCounter > 0) {
            let days = [];
            for (let i = 0; i <= 6; i++) {
                days.push({
                    day: d.date() === 1 ? d.format("DD, MMM") : d.format("DD"),
                    secondary: d.month() + 1 !== month,
                    date: d.format("YYYY-MM-DD"),
                    today: d.format("YYYY-MM-DD") === today,
                    formatedDate: d.format("DD/MM/YYYY"),
                    dow: d.format("dddd"),
                    isWeekend: d.day() === 0,
                });
                d.add(1, "d");

                if (d.month() + 1 === month) {
                    foundFirst = true;
                }

                if (foundFirst && d.month() + 1 !== month) {
                    foundLast = true;
                }
            }

            safeCounter--;

            weeks.push(days);
        }

        d.add(-1, "d");
        let lastDay = d.format("YYYY-MM-DD");

        let tasks = await getTasks(firstDay, lastDay);

        weeks = weeks.map((w) => {
            return w.map((d) => {
                return {
                    ...d,
                    tasks: tasks.filter((t) => t.date === d.date),
                };
            });
        });

        return weeks;
    }
};

function Calendar({
    onSelect,
    load,
    loading,
    rows,
    mode,
    setMode,
    currentDate,
    setCurrentDate,
    children,
}) {
    const getTitle = () => {
        if (loading) {
            return <i className="fa fa-spinner fa-spin text-primary"></i>;
        }

        if (mode === "week") {
            let begin = moment().isoWeek(currentDate).day(0).format("DD/MM");
            let end = moment().isoWeek(currentDate).day(6).format("DD/MM");
            return begin + " - " + end;
        } else if (mode === "month") {
            let d = moment(`${currentDate}-01 12:00:00`);
            let m = d.format("MMMM");
            return (
                m.charAt(0).toUpperCase() + m.slice(1) + ", " + d.format("YYYY")
            );
        }
    };

    const changeMonth = (amount) => {
        (async () => {
            if (mode === "week") {
                let d = parseInt(currentDate) + amount;
                setCurrentDate(d);
                load(mode, d);
            } else if (mode === "month") {
                let d = moment(`${currentDate}-01 12:00:00`);
                d.add(amount, "M");
                let newMonth = d.format("YYYY-MM");
                setCurrentDate(newMonth);
                load(mode, newMonth);
            }
        })();
    };

    const filteredRows = React.useMemo(() => {
        try {
            if (mode === "week") {
                return rows.map((day) => {
                    return {
                        ...day,
                        tasks: day.tasks ? day.tasks : [],
                    };
                });
            } else if (mode === "month") {
                return rows.map((week) => {
                    return week.map((day) => {
                        return {
                            ...day,
                            tasks: day.tasks ? day.tasks : [],
                        };
                    });
                });
            }
        } catch (e) {
            return [];
        }
    });

    const monthMode = () => {
        setCurrentDate(moment().format("YYYY-MM"));
        setMode("month");
        load("month", moment().format("YYYY-MM"));
    };

    const weekMode = () => {
        setCurrentDate(moment().isoWeek());
        setMode("week");
        load("week", moment().isoWeek());
    };

    React.useEffect(() => {
        load(mode, currentDate);
    }, []);

    const renderMonth = () => {
        return (
            <>
                <div className="flex">
                    {dows.map((dow, i) => (
                        <div
                            key={`dow_${i}`}
                            className="Calendar-Day-Week"
                            style={{ width: "14.2%" }}
                        >
                            {dow}
                        </div>
                    ))}
                </div>

                {filteredRows.map((row, ri) => (
                    <div
                        key={`row_${ri}`}
                        className="Calendar-Row"
                        style={{ height: `${100 / rows.length}%` }}
                    >
                        {row.length > 0 &&
                            row.map((day, di) => {
                                return (
                                    <div
                                        key={`day_${ri}_${di}`}
                                        className={`Calendar-Day ${
                                            day.secondary && "Secondary"
                                        } ${day.isWeekend && "Weekend"}`}
                                    >
                                        <div className={`Calendar-Day-Title`}>
                                            {day.today ? (
                                                <span className="bg-yellow-300 rounded-full px-3">
                                                    {day.day}
                                                </span>
                                            ) : (
                                                day.day
                                            )}
                                        </div>
                                        {day.tasks.length > 0 && (
                                            <div className="Calendar-Day-Tasks">
                                                {day.tasks.map((task) => (
                                                    <div
                                                        key={`task_${task.id}`}
                                                        className={`Calendar-Task ${
                                                            task.done_at
                                                                ? "Done"
                                                                : ""
                                                        }`}
                                                        onClick={() =>
                                                            onSelect(task)
                                                        }
                                                    >
                                                        <div className="text-yellow-300">
                                                            <span
                                                                className={
                                                                    task.type
                                                                        .icon
                                                                }
                                                            ></span>
                                                        </div>
                                                        <div
                                                            className="Calendar-Task-Title"
                                                            title={task.title}
                                                        >
                                                            {task.title}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                    </div>
                ))}
            </>
        );
    };

    const renderWeek = () => {
        return (
            <>
                <div className="flex">
                    {dows.map((dow, i) => (
                        <div
                            key={`dow_${i}`}
                            className="Calendar-Day-Week"
                            style={{ width: "14.2%" }}
                        >
                            {dow}
                        </div>
                    ))}
                </div>

                <div className="Calendar-Row" style={{ height: `100%` }}>
                    {filteredRows.map((day, di) => (
                        <div
                            key={`day__${di}`}
                            className={`Calendar-Day WeekMode ${
                                day.isWeekend && "Weekend"
                            }`}
                        >
                            <div className={`Calendar-Day-Title`}>
                                {day.today ? (
                                    <span className="bg-yellow-300 rounded-full px-3">
                                        {day.day}
                                    </span>
                                ) : (
                                    day.day
                                )}
                            </div>
                            {day.tasks && day.tasks.length > 0 && (
                                <div className="Calendar-Day-Tasks WeekMode">
                                    {day.tasks.map((task) => (
                                        <div
                                            key={`task_${task.id}`}
                                            className={`Calendar-Task ${
                                                task.done_at ? "Done" : ""
                                            }`}
                                            onClick={() => onSelect(task)}
                                        >
                                            <div className="text-yellow-300">
                                                <span
                                                    className={task.type.icon}
                                                ></span>
                                            </div>
                                            <div
                                                className="Calendar-Task-Title"
                                                title={task.title}
                                            >
                                                {task.title}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </>
        );
    };

    return (
        <div className="Calendar">
            <div className="Calendar-Header">
                <div>{children}</div>

                <div className="Calendar-Title">
                    <div
                        className="Calendar-Title-Nav"
                        onClick={() => changeMonth(-1)}
                    >
                        Anterior
                    </div>
                    <div className="Calendar-Title-Month">{getTitle()}</div>
                    <div
                        className="Calendar-Title-Nav"
                        onClick={() => changeMonth(1)}
                    >
                        Próximo
                    </div>
                </div>

                <div>
                    <ButtonGroup variant="contained" color="primary">
                        <Button
                            color={`${
                                mode === "month" ? "secondary" : "default"
                            }`}
                            onClick={() => monthMode()}
                        >
                            <span className="far fa-th"></span>
                        </Button>
                        <Button
                            color={`${
                                mode === "week" ? "secondary" : "default"
                            }`}
                            onClick={() => weekMode()}
                        >
                            <span className="far fa-columns"></span>
                        </Button>
                    </ButtonGroup>
                </div>
            </div>

            <div className="Calendar-Body">
                <div className="Calendar-Days">
                    {mode === "month" && renderMonth()}
                    {mode === "week" && renderWeek()}
                </div>
            </div>
        </div>
    );
}

export default Calendar;
