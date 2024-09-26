import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: "6px 16px",
    },
    secondaryTail: {
        backgroundColor: theme.palette.secondary.main,
    },
}));

export default function DealTimeLine({ histories }) {
    const classes = useStyles();

    return (
        <Timeline align="left">
            {histories.map((history, index) => (
                <TimelineItem key={history.id}>
                    <TimelineOppositeContent style={{flex: 0}}>
                        <Typography variant="body2" color="textSecondary">
                            {history.date_formatted}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {history.time_formatted}
                        </Typography>
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineDot>
                            <span className={history.icon}></span>
                        </TimelineDot>
                        {(index != histories.length-1) && <TimelineConnector />}
                    </TimelineSeparator>
                    <TimelineContent>
                        <Paper elevation={3} className={classes.paper}>
                            <Typography>{history.description}</Typography>
                        </Paper>
                    </TimelineContent>
                </TimelineItem>
            ))}
        </Timeline>
    );
}
