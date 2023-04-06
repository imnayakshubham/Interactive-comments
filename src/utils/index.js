export const timeAgo = (date) => {
    const currentDate = new Date();
    const timeDiff = currentDate.getTime() - date.getTime();
    const seconds = Math.round(timeDiff / 1000);
    const minutes = Math.round(seconds / 60);
    const hours = Math.round(minutes / 60);
    const days = Math.round(hours / 24);
    const weeks = Math.round(days / 7);

    if (seconds < 60) {
        return (seconds < 10 ? "few" : seconds) + ' seconds ago';
    } else if (minutes < 60) {
        return minutes + ' minutes ago';
    } else if (hours < 24) {
        return hours + ' hours ago';
    } else if (days < 7) {
        return days + ' days ago';
    } else {
        return weeks + ' weeks ago';
    }
}


export const highlightUserTags = (text) => {
    const regex = /@(\w+)/g;
    const html = text.replace(regex, '<span class="user__tag">@$1</span>');
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

