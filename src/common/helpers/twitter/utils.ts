const findViewCount = (data: any): number => {
  return data.data.threaded_conversation_with_injections_v2.instructions[0]
    .entries[0].content.itemContent.tweet_results.result.views.count;
};

const findTweetText = (data: any): string => {
  return data.data.threaded_conversation_with_injections_v2.instructions[0]
    .entries[0].content.itemContent.tweet_results.result.legacy.full_text;
};

const findLikes = (data: any): number => {
  return data.data.threaded_conversation_with_injections_v2.instructions[0]
    .entries[0].content.itemContent.tweet_results.result.legacy.favorite_count;
};

const findRetweets = (data: any): number => {
  return data.data.threaded_conversation_with_injections_v2.instructions[0]
    .entries[0].content.itemContent.tweet_results.result.legacy.retweet_count;
};

const findComments = (data: any): number => {
  return data.data.threaded_conversation_with_injections_v2.instructions[0]
    .entries[0].content.itemContent.tweet_results.result.legacy.reply_count;
};

const findBookmarks = (data: any): number => {
  return data.data.threaded_conversation_with_injections_v2.instructions[0]
    .entries[0].content.itemContent.tweet_results.result.legacy.bookmark_count;
};

const findAuthor = (data: any): string => {
  return data.data.threaded_conversation_with_injections_v2.instructions[0]
    .entries[0].content.itemContent.tweet_results.result.core.user_results
    .result.legacy.screen_name;
};

export async function getTweetData(tweetId: string) {
  const apiResponse = await fetch(
    `https://x.com/i/api/graphql/nBS-WpgA6ZG0CyNHD517JQ/TweetDetail?variables=${encodeURIComponent(
      JSON.stringify({
        focalTweetId: tweetId,
        with_rux_injections: false,
        rankingMode: 'Relevance',
        includePromotedContent: true,
        withCommunity: true,
        withQuickPromoteEligibilityTweetFields: true,
        withBirdwatchNotes: true,
        withVoice: true,
      }),
    )}&features=${encodeURIComponent(
      JSON.stringify({
        rweb_tipjar_consumption_enabled: true,
        responsive_web_graphql_exclude_directive_enabled: true,
        verified_phone_label_enabled: false,
        creator_subscriptions_tweet_preview_api_enabled: true,
        responsive_web_graphql_timeline_navigation_enabled: true,
        responsive_web_graphql_skip_user_profile_image_extensions_enabled:
          false,
        communities_web_enable_tweet_community_results_fetch: true,
        c9s_tweet_anatomy_moderator_badge_enabled: true,
        articles_preview_enabled: true,
        responsive_web_edit_tweet_api_enabled: true,
        graphql_is_translatable_rweb_tweet_is_translatable_enabled: true,
        view_counts_everywhere_api_enabled: true,
        longform_notetweets_consumption_enabled: true,
        responsive_web_twitter_article_tweet_consumption_enabled: true,
        tweet_awards_web_tipping_enabled: false,
        creator_subscriptions_quote_tweet_preview_enabled: false,
        freedom_of_speech_not_reach_fetch_enabled: true,
        standardized_nudges_misinfo: true,
        tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled:
          true,
        rweb_video_timestamps_enabled: true,
        longform_notetweets_rich_text_read_enabled: true,
        longform_notetweets_inline_media_enabled: true,
        responsive_web_enhance_cards_enabled: false,
      }),
    )}&fieldToggles=${encodeURIComponent(
      JSON.stringify({
        withArticleRichContentState: true,
        withArticlePlainText: false,
        withGrokAnalyze: false,
        withDisallowedReplyControls: false,
      }),
    )}`,
    {
      method: 'GET',
      headers: {
        accept: '*/*',
        'accept-language': 'en-US,en;q=0.9',
        authorization:
          'Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA',
        'content-type': 'application/json',
        cookie:
          'guest_id=v1%3A172711866704604324; night_mode=2; kdt=Vm1aR9HWJRT5WV8NEFoqF99l6XumPgjyWqe0zSQ1; auth_token=fc3a35ab367775aecbec60bab122f3060533150c; ct0=925f6344746907fbf9c34f6d58c6b573b110c0b5eeeb48287417cba5240e2e01ad43bc2803b2083a2a5078d2385604b8e6c1d34f1e679cf8e7a8ed83bea3af299110b721b8f40aa0c820523c7b797b41; lang=en; twid=u%3D1535438792579948544; d_prefs=MjoxLGNvbnNlbnRfdmVyc2lvbjoyLHRleHRfdmVyc2lvbjoxMDAw; guest_id_marketing=v1%3A172711866704604324; guest_id_ads=v1%3A172711866704604324; personalization_id="v1_C447T0WadS3vSW0WNHtpDw=="',
        dnt: '1',
        priority: 'u=1, i',
        'sec-ch-ua': '"Chromium";v="129", "Not=A?Brand";v="8"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'user-agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
        'x-twitter-active-user': 'yes',
        'x-twitter-auth-type': 'OAuth2Session',
        'x-twitter-client-language': 'en',
        'x-csrf-token':
          '925f6344746907fbf9c34f6d58c6b573b110c0b5eeeb48287417cba5240e2e01ad43bc2803b2083a2a5078d2385604b8e6c1d34f1e679cf8e7a8ed83bea3af299110b721b8f40aa0c820523c7b797b41',
        'x-client-transaction-id':
          'm88P9QH5SK+8WJOq1Ga+6kSIqbWkGO5meO4VgRioKLBQBDjTAEGlR24Guj4sZANwURibWZlv+FQFnO+1LQK5kEjjpxN+mA',
      },
      cache: 'no-store',
    },
  );
  const data = await apiResponse.json();
  const viewCount = findViewCount(data);
  const tweetText = findTweetText(data);
  const likes = findLikes(data);
  const retweets = findRetweets(data);
  const comments = findComments(data);
  const bookmarks = findBookmarks(data);
  const author = findAuthor(data);
  return {
    viewCount,
    tweetText,
    likes,
    retweets,
    comments,
    bookmarks,
    author,
  };
}

// getTweetData('1885362984634978541').then(console.log);
