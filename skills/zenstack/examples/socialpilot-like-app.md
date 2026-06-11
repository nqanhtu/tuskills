# Example: SocialPilot-like app

Models to consider:

- User
- Workspace
- WorkspaceMember
- SocialAccount
- SocialPage
- Post
- ScheduledPost
- MediaAsset
- InboxConversation
- InboxMessage

Policy ideas:

- Workspace members can read workspace data.
- Only admins can connect/disconnect social accounts.
- Editors can create posts.
- Approvers can approve scheduled posts.
- Messages are readable by workspace members assigned to the page.

ZenStack is useful because policies live near the models and can protect ORM queries and generated CRUD APIs.
