import moment from 'moment';

exports.getCreatedAt = audio => new Date(audio.created_at).toLocaleDateString();

exports.getDuration = audio => moment.utc(audio.duration * 1000).format('HH:mm:ss');

exports.generateUrl = audio => `/audio/${audio.id}-${encodeURI(audio.title)}`;
