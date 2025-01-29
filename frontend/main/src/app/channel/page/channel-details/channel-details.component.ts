import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ContainerComponent } from '../../../shared/component/container/container.component';
import { CardModule } from 'primeng/card';
import { TypographyComponent } from '../../../shared/component/typography/typography.component';
import { ActivatedRoute, Params } from '@angular/router';
import { ChannelDetailsDto } from '../../model/channel-detais-dto.model';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ChannelChatComponent } from '../../component/chat/channel-chat/channel-chat.component';
import { MemberChannelService } from '../../service/api/member-channel.service';
import { ButtonModule } from 'primeng/button';
import { VideoRoomOverlayComponent } from '../../component/video-room/video-room-overlay/video-room-overlay.component';
import { TooltipModule } from 'primeng/tooltip';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MemberProfileDto } from '../../../user/model/member-profile-dto.model';
import { CurrentUserService } from '../../../user/service/current-user.service';
import { ChannelMemberDto } from '../../model/member/channel-member-dto.model';
import { ChannelMemberRights } from '../../enum/channel-member-rights.enum';
import {
  AddChannelMemberDialogComponent,
  AddChannelMemberDialogConfig,
} from '../../component/add-channel-member-dialog/add-channel-member-dialog.component';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-channel-details',
  imports: [
    CommonModule,
    ContainerComponent,
    CardModule,
    TypographyComponent,
    ChannelChatComponent,
    ButtonModule,
    VideoRoomOverlayComponent,
    TooltipModule,
    TranslateModule,
  ],
  templateUrl: './channel-details.component.html',
  styleUrl: './channel-details.component.scss',
})
export class ChannelDetailsComponent implements OnInit, OnDestroy {
  private readonly memberChannelService = inject(MemberChannelService);
  private readonly currentUserService = inject(CurrentUserService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly dialogService = inject(DialogService);
  private readonly translateService = inject(TranslateService);

  private loadChannelSubscription: Subscription | null = null;
  private userProfileSubscription!: Subscription;
  protected channel: ChannelDetailsDto | null = null;
  protected userProfile!: MemberProfileDto;
  protected currentUserChannelMember?: ChannelMemberDto;
  protected showVideoRoom = false;
  protected channelMemberRights = ChannelMemberRights;

  public ngOnInit(): void {
    this.userProfileSubscription = this.currentUserService
      .getMemberProfileAsObservable()
      .subscribe((userProfile) => (this.userProfile = userProfile));
    this.activatedRoute.params.subscribe((params: Params) => {
      this.loadChannel(params['id']);
    });
  }

  public ngOnDestroy(): void {
    this.userProfileSubscription.unsubscribe();
  }

  private loadChannel(id: string): void {
    this.channel = null;
    //todo: change to false
    this.showVideoRoom = true;
    this.loadChannelSubscription && this.loadChannelSubscription.unsubscribe();
    this.loadChannelSubscription = this.memberChannelService
      .getById(id)
      .subscribe((res) => {
        this.channel = res;
        this.currentUserChannelMember = res.members.find(
          (member) => member.member.id === this.userProfile.id
        );
      });
  }

  protected toggleShowVideoRoom() {
    this.showVideoRoom = !this.showVideoRoom;
  }

  protected closeVideoRoom() {
    this.showVideoRoom = false;
  }

  protected currentUserHasRight(right: ChannelMemberRights) {
    return (
      this.currentUserChannelMember !== undefined &&
      this.currentUserChannelMember.rights.includes(right)
    );
  }

  protected openAddChannelMemberDialog() {
    if (this.channel === null || this.currentUserChannelMember === undefined) {
      return;
    }
    const data: AddChannelMemberDialogConfig = {
      availableRights: this.currentUserChannelMember.rights,
      channel: this.channel,
    };
    this.dialogService.open(AddChannelMemberDialogComponent, {
      closable: true,
      modal: true,
      header: this.translateService.instant('channel.addMember'),
      dismissableMask: true,
      data,
    });
  }
}
