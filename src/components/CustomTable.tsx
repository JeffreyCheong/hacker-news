import React, { useEffect, useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Logo from '../assets/logo/y18.gif';
import useAxios from 'axios-hooks'
import { API_URL } from '../@constants/api';
import TableData from './TableData';

const DEFAULT_PAGE_SIZE = 30;

const useStyles = makeStyles<Theme>((theme: Theme) => ({
    root: {
        minWidth: 796,
        background: '#f6f6ef',
        borderBottom: '3px solid #ff6600'
    },
    tableHeader: {
        background: '#ff6600',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    logo: {
        border: '1px solid #FFF'
    },
    url: {
        textDecoration: 'none'
    },
    end:{
        padding: '5px 0'
    },
    more: {
        textDecoration: 'none',
        color:'#000000',
    }
}))

const paginate = (array: Array<number>, page_size: number, page_number: number): Array<number> => {
    // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
    return array.slice((page_number - 1) * page_size, page_number * page_size);
}

const CustomTable: React.FC = () => {
    const classes = useStyles();
    const [storyUrl, setStoryUrl] = useState<string>('topstories');
    const [{ data, loading, error }, refetch] = useAxios(
        `${API_URL}/${storyUrl}.json?print=pretty`
    );
    const [page, setPage] = useState<number>(1);

    const [newStory, setNewStory] = useState<Array<number>>([]);
    
    const handleStoryUrl = (val: string) => {
        setStoryUrl(val)
    }

    const handlePage = () => {
        setPage(page + 1)
    }
    
    useEffect(() => {
        if (data) {
            setNewStory(paginate(data, DEFAULT_PAGE_SIZE, page))
            console.log(data)
        }
    }, [data, page])
    
    useEffect(() => {
        refetch()
    }, [refetch])

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error!</p>

    return (

        <table className={classes.root}>
            <thead>
                <tr className={classes.tableHeader}>
                    <th className={classes.tableHeader}>
                        <span><img src={Logo} className={classes.logo} /></span>
                        <span>&nbsp; <a href="#" className={classes.url} onClick={() => handleStoryUrl('topstories')}>Hacker News</a> &nbsp;</span>
                        <span>&nbsp; <a href="#"  className={classes.url} onClick={() => handleStoryUrl('newstories')}>new</a>&nbsp;</span>
                    </th>    
                </tr>
            </thead>
            <tbody>
                { 
                    newStory.map((i, key) => {
                        return <TableData type={storyUrl} key={key} i={i} index={key + 1} />
                    })  
                }
            </tbody>
            <tfoot>
                <tr><td className={classes.end}><a  href="#" onClick={handlePage} className={classes.more}>More</a></td></tr>
            </tfoot>
            
        </table>

    )
}

export default CustomTable;