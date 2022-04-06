import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import Link from '../../Link/Link'


export default function GroupsCard({ groups }) {

    const { groupName, groupDescription, groupID } = groups;

    return (
        <Card sx={{ maxWidth: 340 }} elevation={3}>
            <CardHeader
                title={groupName}
                subheader={groupDescription}
            />
            <CardContent>
            {/* <Typography variant="body2" color="text.secondary">
                        {"Members: "}
            </Typography>
                {members.map(member => (
                    <Typography variant="body2" color="text.secondary">
                        {member}
                    </Typography>
                ))} */}
            </CardContent>
            <CardActions>
                {/* ADD STYLING BUTTON HERE + WHEN CLICKED, THIS SHOULD TAKE THEM TO THE GROUPS PAGE ONLY*/}
                <Link href={'/groups/' + groupID} underline="none">
                    <Button size="small">OPEN</Button>
                </Link>
            </CardActions>
        </Card>
    );
}