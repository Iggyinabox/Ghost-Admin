import {Factory, faker} from 'ember-cli-mirage';
import {isEmpty} from '@ember/utils';

export default Factory.extend({
    codeinjectionFoot: null,
    codeinjectionHead: null,
    createdAt: '2015-09-11T09:44:29.871Z',
    createdBy: 1,
    customExcerpt: null,
    customTemplate: null,
    description(i) { return `Title for post ${i}.`; },
    featured: false,
    featureImage(i) { return `/content/images/2015/10/post-${i}.jpg`; },
    html(i) { return `<p>HTML for post ${i}.</p>`; },
    locale: null,
    metaDescription(i) { return `Meta description for post ${i}.`; },
    metaTitle(i) { return `Meta Title for post ${i}`; },
    ogDescription: null,
    ogImage: null,
    ogTitle: null,
    plaintext(i) { return `Plaintext for post ${i}.`; },
    publishedAt: '2015-12-19T16:25:07.000Z',
    publishedBy: 1,
    status(i) { return faker.list.cycle('draft', 'published', 'scheduled')(i); },
    title(i) { return `Post ${i}`; },
    twitterDescription: null,
    twitterImage: null,
    twitterTitle: null,
    updatedAt: '2015-10-19T16:25:07.756Z',
    updatedBy: 1,
    uuid(i) { return `post-${i}`; },

    authors() { return []; },
    tags() { return []; },

    afterCreate(post, server) {
        if (isEmpty(post.authors)) {
            let user = server.schema.users.find(1);

            if (!user) {
                let role = server.schema.roles.find({name: 'Administrator'}) || server.create('role', {name: 'Administrator'});
                user = server.create('user', {roles: [role]});
            }

            post.authors = [user];
            post.save();
        }
    }
});
