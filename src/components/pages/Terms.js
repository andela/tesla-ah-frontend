/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import '../../assets/scss/pages/_terms.scss';

const Terms = () => (
  <section className="container main-section">
    <main className="row mt-5 mb-5 terms card">
      <h2 className="terms__title mb-3">Authors Haven Terms and Conditions</h2>
      <p>
        Welcome to Authors Haven! The following terms and conditions govern all use of the
        Authors Haven website and all content
        and services available at or through the website.
      </p>
      <p>
        {' '}
         Please read this Agreement carefully before accessing or using the Website.
         By accessing or using any part of the web
         site, you agree to become bound by the terms and conditions of this agreement.
         If you do not agree to all the terms and
         conditions of this agreement, then you may not use this website services.
         If these terms and conditions are considered
         an offer by Authors Haven, acceptance is expressly limited to these terms.

      </p>
      <h3 className="terms__pub--policy row col-sm-12 mb-3 mt-2">Publication policy</h3>
      <br />
      <div className="terms__pub--1">
        <h4 className="terms__pub--conditions">Terms and conditions of publishing articles on Authors Haven</h4>
        <p>
          By submitting any article for publication on Authors Haven,
          the author has undertaken and agreed with the following
          terms and conditions:
        </p>
        <ol>
          <li>
             That the article is original work of the author
             and has not been published anywhere before.

          </li>
          <li>
            That if there is any plagiarism or violation of copyright
            due to publication of the article,
            then the author will be solely responsible for it, and will hold
            Intelligent Legal Risk Management Solutions LLP, the owner of Authors Haven
            indemnified against any damages and legal action.

          </li>
          <li>
            That in case of adverse public opinion, governmental action,
            criticism or harm to the image of the website, the site
            moderator reserves the right to take down the article.

          </li>
          <li>
            That the author is responsible for the content he/she posts.
            This means he/she assumes all risks related to it,
            including someone else’s reliance on its accuracy,
            or claims relating to intellectual property or other legal rights.

          </li>
        </ol>
        <h4>Right on the content posted on Authors Haven</h4>
        <p>
            The content posted on Authors haven, The author has a non-exclusive license
            to publish it on Author’s haven.
            Including anything reasonably related to publishing it (like storing, displaying,
            reformatting, and distributing it).
            In consideration for Authors haven granting you access,
            you agree that Authors haven may use your content to promote
            Authors haven products. However, Authors haven will never sell
            your content to third parties without your permission.
        </p>
        <h4>Moderation of comments</h4>
        <p>
            We encourage users to have a lively debate and discussion of their work and ideas.
            However, by submitting a comment you agree to abide by the following rules.
            We reserve the right to delete any comments that contravene any of these rules.

        </p>
        <ol>
          <b><li>Identification</li></b>
          <p>
            Anonymous comments are not allowed.
            For a user to comment he/she must be authenticated.

          </p>
          <b><li>Conduct and use of language</li></b>
          <p>
            Comments should be relevant to the article.
            All off-topic, abusive or defamatory comments will not be accepted.
            Comments should not attack an individual’s personality or character.

          </p>
          <b><li>Spamming and advertising</li></b>
          <p>
            No advertising or promotion is allowed except when an event,
            service or product has direct relevance to the topic of
            discussion.

          </p>
        </ol>
        <h4>Reporting abuse</h4>
        <p>
          {' '}
          Any author or commenter who posts content which is deemed to be inappropriate
          will be notified and the article will be blocked or comment will be deleted.
          The Authors Haven moderator has the right to remove
          all inappropriate articles or comments.
          If a user abuses his right to report articles or comments,
          the site moderator reserves the right to delete his account
          from Authors Haven.
        </p>
        <h4>Site terms of use modifications</h4>
        <p>
          Authors Haven reserves the right, at its sole discretion,
          to modify or replace any part of this Agreement.
          It is your responsibility to check this Agreement periodically for changes.
          Your continued use of or access to the Website
          following the posting of any changes to this
          Agreement constitutes acceptance of those changes.
        </p>
        <h4>Termination</h4>
        <p>
         Authors Haven may terminate your access to all or any part of the Website at any time,
          with or without cause, with or without notice, effective immediately.
        </p>
        <h4>Security</h4>
        <p>
          If you find a security vulnerability on Authors Haven,
          Please let us know to be able to fix it.Do not use that
          vulnerability to breach into our system.
        </p>
        <h4>Non transferable</h4>
        <p>
           Any password or right given to you to obtain Materials from the Site is not transferable.
           You are responsible for
           maintaining the confidentiality of your account number and/or password,
           if applicable. You are responsible for all uses
           of your account, whether or not actually or expressly authorized by you.
        </p>
        <h4>Entire agreement</h4>
        <p>
         These Terms and conditions are the whole agreement between
         Authors Haven and you concerning its services.

        </p>
      </div>
    </main>
  </section>
);

export default Terms;
