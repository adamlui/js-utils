on:
  push:
    branches: [master, main]
    paths: '**/minify.js'

jobs:
  build:
    runs-on: ubuntu-latest
    steps:

      - name: Checkout adamlui/js-utils
        uses: actions/checkout@v2
        with:
          token: ${{ secrets.REPO_SYNC_PAT }}
          repository: adamlui/js-utils
          path: adamlui/js-utils
          fetch-depth: 2

      - name: Build list of target repos
        id: list_repos
        run: |
          target_repos=("adamlui/userscripts" "adamlui/chatgpt-apps" "adamlui/autoclear-chatgpt-history" "adamlui/chatgpt-auto-continue" "adamlui/chatgpt-auto-refresh" "adamlui/chatgpt-infinity" "adamlui/chatgpt-widescreen" "adamlui/youtube-classic" "kudoai/bravegpt" "kudoai/chatgpt.js" "kudoai/duckduckgpt")
          echo "::set-output name=repos::${target_repos[*]}"
      - name: Checkout target repos
        run: |
          target_repos=(${{ steps.list_repos.outputs.repos }})
          for repo in "${target_repos[@]}"; do
            repo_path="${repo//\//_}"
            echo "::group::Checking out $repo"
            git clone https://github.com/$repo.git $GITHUB_WORKSPACE/$repo_path
            echo "::endgroup::"
          done
      - name: Replace outdated files in target repos, push changes
        run: |
          target_repos=(${{ steps.list_repos.outputs.repos }})
          source_file="${{ github.workspace }}/adamlui/js-utils/minify-js/minify.js"
          source_timestamp=$(cd "${{ github.workspace }}/adamlui/js-utils" && git log -1 --format="%ct" -- "minify-js/minify.js")
          for repo in "${target_repos[@]}"; do
            echo "::group::Replacing minify.js in $repo"
            repo_path="${repo//\//_}"
            target_dir="$GITHUB_WORKSPACE/$repo_path"
            cd "$target_dir" || exit 1
            target_files=$(find . -name "minify.js" -type f)
            for target_file in $target_files; do
              target_timestamp=$(git log -1 --format="%ct" -- "$target_file")
              if [[ $source_timestamp -gt $target_timestamp ]]; then
                echo "Copying $source_file to $target_file"
                cp -f "$source_file" "$target_file"
                git add "$target_file"
              fi
            done
            git diff-index --quiet HEAD || (echo "Committing changes" && \
              GIT_AUTHOR_NAME="Adam Lui" GIT_AUTHOR_EMAIL="adamlui@pm.me" GIT_COMMITTER_NAME="kudo-sync-bot" GIT_COMMITTER_EMAIL="auto-sync@kudoai.com" \
              git commit -m "${{ github.event.head_commit.message }} ↞ [auto-sync from \`adamlui/js-utils\`]")
            git remote set-url --push origin "https://kudo-sync-bot:${{ secrets.REPO_SYNC_PAT }}@github.com/$repo"
            echo "Pushing changes"
            git push --force
            echo "::endgroup::"
          done
