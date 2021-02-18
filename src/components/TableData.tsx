import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import useAxios from "axios-hooks";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { API_URL } from "../@constants/api";
import UpVote from "../assets/images/grayarrow.gif";
import moment from "moment";

interface DetailsProp {
    by: string;
    descendants: number;
    id: number;
    kids: Array<number>;
    score: number;
    time: number;
    title: string;
    type: string;
    url: string;
}

interface TableDataProp {
    i: number;
    index: number;
    type: string;
}

const useStyles = makeStyles<Theme>((theme: Theme) => ({
    root: {
        fontSize: '10pt',

    },
    title: {
        color: '#000000',
        textDecoration: 'none'
    },
    url: {
        color: '#828282',
        fontSize: '8pt',
        textDecoration: 'none'
    },
    content: {
        color: '#828282',
        fontSize: '8pt'
    }
}))

const getNakedDomain = (url: string) => {
    if (url) {
        let nakedDomain;
        let parts = url.split('/');
        let domain = parts[2]
        let domainSplit = domain.split('.')
        if (domainSplit.length == 3) {
            nakedDomain = domainSplit[1] + '.' + domainSplit[2]
        } else {
            nakedDomain = domain;
        }

        return `(${nakedDomain})`;
    } else {
        return ''
    }

}


const TableData: React.FC<TableDataProp> = (props: TableDataProp) => {
    const classes = useStyles();

    const [{ data, loading, error }] = useAxios(
        `${API_URL}/item/${props.i}.json?print=pretty`
    );

    const [details, setDetails] = useState<DetailsProp>({
        by: '',
        descendants: 0,
        id: 0,
        kids: [],
        score: 0,
        time: 0,
        title: '',
        type: '',
        url: ''
    })

    useEffect(() => {
        if (data) {
            setDetails(data)
        }
    }, [data])

    if (loading) return <tr><td>Loading...</td></tr>
    if (error) return <tr><td>Error!</td></tr>

    return (
        details && (
            <>
                {
                    <tr>
                        <td className={classes.root}>
                            <span>{props.index}.</span>
                            <span><img src={UpVote} /></span>
                            <span><a href={details.url} className={classes.title}>{details.title}</a></span>
                            <span ><a href={details.url} className={classes.url}>{getNakedDomain(details.url)}</a></span>
                            <div className={classes.content}>
                                <span>{details.score} points by </span>
                                <span>{details.by} </span>
                                <span>{details.time == 0 ? details.time : moment.unix(details.time).fromNow(true)} | </span>
                                <span> 
                                    <a href='#' className={classes.url}>hide</a> |  
                                    <a href='#' className={classes.url}>{props.type === 'topstories'? '': ' past |'}</a>  
                                    <a href='#' className={classes.url}>{
                                    details.hasOwnProperty('kids') ? 
                                    details.kids.length < 1 ? ' discuss':
                                    ' ' + details.kids.length.toString() + ' comments': 
                                    ' discuss'}
                                    </a> 
                                </span>
                            </div>
                        </td>


                    </tr>
                }
            </>
        )
    )
}

export default TableData;