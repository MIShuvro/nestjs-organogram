export function getRedisQuestionKey(questionId) {
  return questionId.toString();
}

export function getRedisCorrectAnsKey(questionId) {
  return questionId + ':ans';
}

export function getRedisLeaderBoardSortedSetKey(questionId) {
  return questionId + ':leaderboard';
}

export function getRedisUserIdKey(classId, userId) {
  console.log('getRedisUserIdKey', `class:${classId}:user_id:${userId}`);

  return `class:${classId}:user_id:${userId}`;
}

export function getRedisChatChannelStateKey(chatChannel) {
  return chatChannel + ':state';
}

export function getRedisClassDataKey(classId) {
  return `${classId}:data`;
}

export function getPinMessageKey(classId) {
  return `${classId}:pin`;
}

export function getRedisQuestionsRecordKey(classId, userId) {
  return `${classId}:${userId}:questions:record`;
}

export function getSlideHistoryRedisKey(classId, slideNumber) {
  return `${classId}:${slideNumber}:history`;
}

export function getWrongAnsUserList(classId, questionId) {
  return `class:${classId}:question:${questionId}:wrong_ans_user_list`;
}

export function getRedisJoinedUserInfoKey(classId) {
  return `class:${classId}:joined_info`;
}

export function getRedisCommentEnableKey(classId) {
  return `is_comment_enable.${classId}`;
}

export function getRedisLiveclassStatusKey(classId) {
  return `live_class_status.${classId}`;
}

export function getRedisTotalScoreKey(class_id: string) {
  return `${class_id}:totalScore`;
}

export function getRedisClassUserIdSetKey(classId) {
  return `class:${classId}:user_ids`;
}

export function getRedisTotalCorrectAnsGivenUsersKey(class_id: string) {
  return `${class_id}:totalCorrectAnsGivenUsers`;
}

export function getRedisLiveClassStreamHashKey(liveClassId: string) {
  return `live_class_aud_${liveClassId}`;
}

export function getRedisLiveclassQuizKey(quizId: string) {
  return `${quizId}:quiz`;
}

export function getRedisLiveclassQuizOptionCountKey(quizId: string) {
  return `${quizId}:option_count`;
}

export function getRedisQuizLeaderBoardKey(quizId: string) {
  return `${quizId}:leaderboard`;
}

export function getRedisClassLeaderBoardKey(classId: string) {
  return `class:${classId}:leaderboard`;
}

export function getRedisClassQuizUserKey(classId: string) {
  return `class:${classId}:quiz_user`;
}

export function getRedisQuizUserSetKey(quizId: string) {
  return `${quizId}:quiz_user_set`;
}

export function getRedisBanUserModerationKey(userId: string) {
  return `user_moderation:ban:${userId}`;
}

export function getRedisLiveClassStateKey(liveClassId: string) {
  return `live_class_state:${liveClassId}`;
}

export function getRedisLiveClassStateQuizKey(liveClassId: string) {
  return `live_class_state:quiz:${liveClassId}`;
}

export const CLASS_FIRST_JOINED_NAME = 'first_joined_name';
export const CLASS_JOINED_COUNT = 'joined_count';

export function getLiveClassKey(liveClassId: string) {
  return `liveclass:${liveClassId}`;
}
