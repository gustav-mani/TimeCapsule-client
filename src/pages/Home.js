import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { Grid, GridColumn, Transition } from 'semantic-ui-react'
import { useMediaPredicate } from "react-media-hook";

import { AuthContext } from '../context/auth'
import PostCard from '../components/PostCard'
import PostForm from '../components/PostForm'
import { FETCH_POSTS_QUERY} from '../util/graphql'

function Home() {
    const { loading, data: { getPosts: posts }={} } = useQuery(FETCH_POSTS_QUERY);
    const { user } = useContext(AuthContext)
    const biggerThan400 = useMediaPredicate("(min-width: 700px)");
    const rows = biggerThan400?3:1;

    return (
    <Grid columns={rows} >
        <Grid.Row className="page-title">
            <h1>Recent Posts</h1>
        </Grid.Row>
        <Grid.Row>
            {user && (
                <Grid.Column>
                    <PostForm />
                </Grid.Column>
            )}
            {loading ? (
                <h1>loading posts..</h1>
            ):(
                <Transition.Group>
                    {posts && 
                        posts.map((post) => (
                            <GridColumn key={post.id} style={{marginBottom: 20}}>
                                <PostCard post={post}/>
                            </GridColumn>
                    ))}
                </Transition.Group>
            )}
        </Grid.Row>
    </Grid>
    )
}


export default Home;
