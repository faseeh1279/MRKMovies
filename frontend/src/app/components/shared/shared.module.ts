import { NgModule } from "@angular/core";
import { DescriptionPipe } from "./pipes/description.pipe";
import { CardComponent } from "./card/card.component";
import { CommonModule, DatePipe } from "@angular/common";
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';
import { ReviewFormComponent } from './forms/review-form/review-form.component';
import { ModalComponent } from './modals/error-modal/modal.component';
import { MovieUploadedComponent } from './modals/movie-uploaded/movie-uploaded.component';
import { AddReviewComponent } from './modals/add-review/add-review.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ReviewComponent } from './card/review/review.component';
import { DetailsComponent } from './card/details/details.component';
import { ViewDetailComponent } from './modals/view-detail/view-detail.component';
import { PreviewPosterComponent } from './modals/preview-poster/preview-poster.component';
import { EditComponent } from './card/edit/edit.component';
import { EditFormComponent } from './forms/edit-form/edit-form.component';
import { UpdateReviewComponent } from './modals/update-review/update-review.component';
import { TimeAgoPipe } from "./pipes/time-ago.pipe";

@NgModule({
    declarations: [
        DescriptionPipe,
        CardComponent,
        LoadingScreenComponent,
        ReviewFormComponent,
        ModalComponent,
        MovieUploadedComponent,
        AddReviewComponent,
        ReviewComponent,
        DetailsComponent,
        ViewDetailComponent,
        PreviewPosterComponent,
        EditComponent,
        EditFormComponent,
        UpdateReviewComponent,
        TimeAgoPipe
    ],
    imports: [
        CommonModule, 
        ReactiveFormsModule,
        FormsModule, 
        DatePipe
    ],
    exports: [
        DescriptionPipe,
        CardComponent,
        LoadingScreenComponent,
        ReviewFormComponent,
        ModalComponent,
        MovieUploadedComponent,
        AddReviewComponent,
        ReviewComponent,
        DetailsComponent,
        ViewDetailComponent,
        PreviewPosterComponent,
        EditComponent,
        EditFormComponent,
        UpdateReviewComponent, 
        TimeAgoPipe
    ]
})

export class SharedModule { } 