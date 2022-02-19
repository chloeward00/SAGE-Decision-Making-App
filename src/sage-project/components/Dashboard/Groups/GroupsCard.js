import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';

export default function GroupsCard({ groups }) {

    const { groupName, groupDescription, numberOfPlans } = groups;

    return (
        <Card sx={{ maxWidth: 340 }} elevation={3}>
            <CardHeader
                title={groupName}
                subheader={groupDescription}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {"Number of Plans: " + numberOfPlans}
                </Typography>
            </CardContent>
            <CardActions>
                {/* ADD STYLING BUTTON HERE */}
                <Button size="small">OPEN</Button>
            </CardActions>
        </Card>
    );
}